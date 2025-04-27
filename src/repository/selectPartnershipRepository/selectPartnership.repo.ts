import { eq } from "drizzle-orm";
import type { DatabaseClient } from "../../db/db";
import { selectPartnershipSchema } from "../../db/schemas";
import logger from "../../util/globalUtil/logger.util";
import { throwError } from "../../util/globalUtil/throwError.util";
import reshttp from "reshttp";

export class SelectPartnershipRepo {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public async getUserSelectPartnershipByUid(userId: string) {
    const [selectCurrentPartnership] = await this._db
      .select()
      .from(selectPartnershipSchema)
      .where(eq(selectPartnershipSchema.userId, userId))
      .limit(1);
    if (!selectCurrentPartnership) {
      logger.info("User not found");
      return throwError(reshttp.notFoundCode, "User not found");
    }
    return selectCurrentPartnership;
  }

  public async getUserSelectPartnershipByApplicationId(applicationId: string) {
    const [selectCurrentPartnership] = await this._db
      .select()
      .from(selectPartnershipSchema)
      .where(eq(selectPartnershipSchema.applicationId, applicationId))
      .limit(1);
    if (!selectCurrentPartnership) {
      logger.info("User not found");
      return throwError(reshttp.notFoundCode, "User not found");
    }
    return selectCurrentPartnership;
  }
}

export const selectPartnershipRepo = (db: DatabaseClient) => new SelectPartnershipRepo(db);
