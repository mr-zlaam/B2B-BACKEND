import reshttp from "reshttp";
import type { DatabaseClient } from "../../../db/db";
import { selectPartnershipRepo } from "../../../repository/selectPartnershipRepository/selectPartnership.repo";
import { userRepo } from "../../../repository/userRepository/user.repo";
import logger from "../../../util/globalUtil/logger.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import { selectPartnershipSchema } from "../../../db/schemas";
import { canAccessNextLevel } from "../../../util/appUtil/selectPartnershipUtil/selectPartnership.util";
import { eq } from "drizzle-orm";
import { unlockPartnership } from "../../../util/appUtil/authUtil/unlockPartnership.util";

export class SelectPartnershipService {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public async unlockPartnershipLevelWithoutPayment(userId: string, retentionPeriodAchievedByUser: number, kpiPointsAchievedByUser: number) {
    const user = await userRepo(this._db).getUserByuid(userId);
    const currentSelectedPartnerShipLevel = await selectPartnershipRepo(this._db).getUserSelectPartnershipByUid(userId);

    const { DidUserFullfillretentionperiodRequirement, DidUserFullfillkpiPointsRequirement } = canAccessNextLevel(
      currentSelectedPartnerShipLevel.unlockedAt,
      retentionPeriodAchievedByUser,
      kpiPointsAchievedByUser,
      currentSelectedPartnerShipLevel.requiredKpiPoints
    );
    if (!DidUserFullfillretentionperiodRequirement || !DidUserFullfillkpiPointsRequirement) {
      logger.warn("User did not fullfill the requirements");
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
  }
}
export const selectPartnershipService = (db: DatabaseClient) => new SelectPartnershipService(db);
