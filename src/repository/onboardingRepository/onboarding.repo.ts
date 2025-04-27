import { eq } from "drizzle-orm";
import type { DatabaseClient } from "../../db/db";
import { onboardingSchema, type TONBOARDING } from "../../db/schemas";
import logger from "../../util/globalUtil/logger.util";
import { throwError } from "../../util/globalUtil/throwError.util";
import reshttp from "reshttp";

export class OnboardingRepository {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public async getOnboardingByUserId(userId: string): Promise<TONBOARDING> {
    const [onboarding] = await this._db.select().from(onboardingSchema).where(eq(onboardingSchema.userId, userId)).limit(1);
    if (!onboarding) {
      logger.info("Onboarding not found in database  because he/she sent invalid uid which doesn't exist in database(getOnboardingbyuserid)");
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }
    return onboarding;
  }
}

export const onboardingRepo = (db: DatabaseClient) => new OnboardingRepository(db);
