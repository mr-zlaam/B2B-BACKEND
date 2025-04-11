import { eq } from "drizzle-orm";
import type { DatabaseClient } from "../../db/db.js";
import { type TUSER, userSchema } from "../../db/schemas/user.schema.js";
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

  public async getUserByEmail(email: string): Promise<TUSER> {
    const user = await this._db.select().from(userSchema).where(eq(userSchema.email, email)).limit(1);
    if (user.length === 0) {
      logger.info("User not found while verifying user because he/she sent invalid email which doesn't exist in database");
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }
    return user[0];
  }
}
export const userRepo = (db: DatabaseClient) => new UserRepository(db);
