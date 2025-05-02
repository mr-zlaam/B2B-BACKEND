import type { DatabaseClient } from "../../../db/db";
import { selectPartnershipRepo } from "../../../repository/selectPartnershipRepository/selectPartnership.repo";
import { userRepo } from "../../../repository/userRepository/user.repo";
import { onboardingSchema, selectPartnershipSchema } from "../../../db/schemas";
import { canAccessNextLevel } from "../../../util/appUtil/selectPartnershipUtil/selectPartnership.util";
import { eq } from "drizzle-orm";
import { unlockPartnershipWithPayment, unlockPartnershipWithoutPayment } from "../../../util/appUtil/authUtil/unlockPartnership.util";
import envConfig from "../../../config/env.config";
import logger from "../../../util/globalUtil/logger.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import reshttp from "reshttp";
import { promoteUserToNextLevelInOnboarding } from "../../../util/appUtil/authUtil/promoteUserToNextLevelInOnboarding.util";
import { httpResponse } from "../../../util/globalUtil/apiResponse.util";
import type { Request, Response } from "express";
import { verifyPassword } from "../../../util/globalUtil/passwordHasher.util";
import { setTokensAndCookies } from "../../../util/globalUtil/setCookies.util";
class SelectPartnershipService {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public async updateKpiAndRetenionAndunlockPartnershipLevelWithoutPayment(
    req: Request,
    res: Response,
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
        retentionPeriodAchievedByUser,
        updatedAt: new Date()
      })
      .where(eq(selectPartnershipSchema.applicationId, applicationId))
      .returning();
    // ** promote user to onboarding next onboarding level
    if (updatedParternship.partnershipLevelIndex >= 7) {
      logger.info("🎉 User has completed all partnership levels");
      const onboarding = await this._db.query.onboarding.findFirst({ where: eq(onboardingSchema.userId, user.uid) });
      if (!onboarding) {
        return throwError(reshttp.notFoundCode, "Onboarding not found");
      }
      await promoteUserToNextLevelInOnboarding(this._db, user, onboarding.currentOnboardingStageIndex);
      httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
        message: "Partnership level has been completed successfully and User have been promoted to next onboarding level"
      });
      return;
    }
    if (updatedParternship.partnershipLevelIndex < 4) {
      await unlockPartnershipWithoutPayment(this._db, user, updatedParternship.partnershipLevelIndex);
    }
    const allPartnerships = await this._db.query.selectPartnership.findMany({
      where: eq(selectPartnershipSchema.userId, user.uid)
    });

    const mandatoryLevels = [1, 2, 3, 4];
    const allMandatoryCompleted = mandatoryLevels.every((level) => allPartnerships.some((p) => p.partnershipLevelIndex === level && p.completed));

    if (!allMandatoryCompleted) {
      logger.info("Blocked: Levels 1-4 are not all completed.");
      return;
    }

    const highestIndex = Math.max(...allPartnerships.map((p) => p.partnershipLevelIndex), 0);

    logger.info(`Proceeding with highest index: ${highestIndex}`);
    await unlockPartnershipWithoutPayment(this._db, user, highestIndex);
    return;
  }

  public async unlockPartnershipWithPayment(userId: string, partnershipLevelIndex: number) {
    const user = await userRepo(this._db).getUserByuid(userId);
    await unlockPartnershipWithPayment(this._db, user, partnershipLevelIndex, false, true);
  }
  // ** login into application
  public async loginIntoApplication(applicationId: string, email: string, password: string, res: Response) {
    const partnership = await selectPartnershipRepo(this._db).getUserSelectPartnershipByApplicationId(applicationId);
    if (!partnership) {
      logger.info("Partnership not found");
      return throwError(reshttp.notFoundCode, "Invalid applicationId");
    }
    const user = await userRepo(this._db).getUserByEmail(email, "User not found", "Invalid credentials");
    const checkIsPasswordCorrect = await verifyPassword(password, user.password, res);
    if (!checkIsPasswordCorrect) {
      logger.info("Incorrect password");
      return throwError(reshttp.notFoundCode, "Invalid Credentials");
    }
    const { accessToken, refreshToken } = setTokensAndCookies(user, res, true, true);
    return { accessToken, refreshToken };
  }
}
export const selectPartnershipService = (db: DatabaseClient) => new SelectPartnershipService(db);
