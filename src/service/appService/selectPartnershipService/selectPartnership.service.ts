import type { DatabaseClient } from "../../../db/db";
import { selectPartnershipRepo } from "../../../repository/selectPartnershipRepository/selectPartnership.repo";
import { userRepo } from "../../../repository/userRepository/user.repo";
import { selectPartnershipSchema } from "../../../db/schemas";
import { canAccessNextLevel } from "../../../util/appUtil/selectPartnershipUtil/selectPartnership.util";
import { eq } from "drizzle-orm";
import { unlockPartnership } from "../../../util/appUtil/authUtil/unlockPartnership.util";
import envConfig from "../../../config/env.config";
import logger from "../../../util/globalUtil/logger.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import reshttp from "reshttp";

export class SelectPartnershipService {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public async unlockPartnershipLevelWithoutPayment(
    userId: string,
    applicationId: string,
    retentionPeriodAchievedByUser: number,
    kpiPointsAchievedByUser: number
  ) {
    const user = await userRepo(this._db).getUserByuid(userId);
    const currentSelectedPartnerShipLevel = await selectPartnershipRepo(this._db).getUserSelectPartnershipByApplicationId(applicationId);

    if (currentSelectedPartnerShipLevel.completed) {
      throwError(reshttp.badRequestCode, "You've already completed this level");
    }
    canAccessNextLevel(
      currentSelectedPartnerShipLevel.unlockedAt,
      retentionPeriodAchievedByUser,
      kpiPointsAchievedByUser,
      currentSelectedPartnerShipLevel.requiredKpiPoints,
      envConfig.NODE_ENV === "development" ? "2027-01-01" : null
    );
    // ** prepare user to promote
    const [updatedParternship] = await this._db
      .update(selectPartnershipSchema)
      .set({
        completed: true,
        kpiPointsAchievedByUser,
        unlockedByPayment: false,
        retentionPeriodAchievedByUser,
        updatedAt: new Date()
      })
      .where(eq(selectPartnershipSchema.applicationId, applicationId))
      .returning();
    // ** promote user to next level
    if (updatedParternship.partnershipLevelIndex >= 7) {
      logger.info("🎉 User has completed all partnership levels");
      throwError(reshttp.notFoundCode, "No next level found. User has completed all partnership levels");
    }
    await unlockPartnership(this._db, user, updatedParternship.partnershipLevelIndex + 1);
  }
}
export const selectPartnershipService = (db: DatabaseClient) => new SelectPartnershipService(db);
