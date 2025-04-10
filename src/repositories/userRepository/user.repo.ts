import { eq } from "drizzle-orm";
import type { DatabaseClient } from "../../db/db.js";
import { userSchema } from "../../db/schemas/user.schema.js";
import { throwError } from "../../util/globalUtil/throwError.util.js";
import reshttp from "reshttp";
import logger from "../../util/globalUtil/logger.util.js";

export class UserRepository {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public async getUserByToken(OTP_TOKEN: string) {
    try {
      const user = await this._db.select().from(userSchema).where(eq(userSchema.OTP_TOKEN, OTP_TOKEN)).limit(1);
      return [user, typeof user];
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.warn(error.message, { error });
        throwError(reshttp.internalServerErrorCode, error.message);
      } else {
        logger.error("Something went wrong while fetching user using top token", { error });
        throwError(reshttp.internalServerErrorCode, reshttp.internalServerErrorMessage);
      }
    }
  }
}
