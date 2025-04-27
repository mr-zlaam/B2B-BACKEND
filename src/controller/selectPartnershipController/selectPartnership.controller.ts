import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import { selectPartnershipSchema, type TSELECTPARTERSHIP } from "../../db/schemas";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import logger from "../../util/globalUtil/logger.util";
import { throwError } from "../../util/globalUtil/throwError.util";
import { eq } from "drizzle-orm";
import { canAccessNextLevel } from "../../util/appUtil/selectPartnershipUtil/selectPartnership.util";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { unlockPartnership } from "../../util/appUtil/authUtil/unlockPartnership.util";
import { userRepo } from "../../repository/userRepository/user.repo";

export class SelectPartnershipController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }

  // ** Unlock Partnership by fullfilling the requirements
  public unlockPartnershipByRequirements = asyncHandler(async (req: _Request, res) => {
    //TODO: middleware needed
    const { kpiPointsAchievedByUser, retentionPeriodAchievedByUser } = req.body as TSELECTPARTERSHIP;
    if (!kpiPointsAchievedByUser || !retentionPeriodAchievedByUser) {
      logger.info("Invalid kpi points or retention period");
      return throwError(reshttp.badRequestCode, "Invalid kpi points or retention period");
    }
    const userId = req.userFromToken?.uid;
    if (!userId) {
      logger.info("User not found");
      return throwError(reshttp.notFoundCode, "User not found");
    }
    const user = await userRepo(this._db).getUserByuid(userId);
    const [currentSelectedPartnerShipLevel] = await this._db
      .select()
      .from(selectPartnershipSchema)
      .where(eq(selectPartnershipSchema.userId, userId))
      .limit(1);

    const { DidUserFullfillretentionperiodRequirement, DidUserFullfillkpiPointsRequirement } = canAccessNextLevel(
      currentSelectedPartnerShipLevel.unlockedAt,
      retentionPeriodAchievedByUser,
      kpiPointsAchievedByUser,
      currentSelectedPartnerShipLevel.requiredKpiPoints
    );
    if (!DidUserFullfillretentionperiodRequirement || !DidUserFullfillkpiPointsRequirement) {
      logger.info("User did not fullfill the requirements");
      return throwError(reshttp.badRequestCode, "User did not fullfill the requirements");
    }
    // ** prepare user to promote
    await this._db
      .update(selectPartnershipSchema)
      .set({
        completed: true,
        kpiPointsAchievedByUser,
        unlockedByPayment: false,
        retentionPeriodAchievedByUser,
        updatedAt: new Date()
      })
      .where(eq(selectPartnershipSchema.userId, userId));
    // ** promote user to next level
    await unlockPartnership(this._db, user, currentSelectedPartnerShipLevel.partnershipLevelIndex + 1, 6);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Partnership level has been completed successfully and User have been promoted to next level"
    });
  });
}
