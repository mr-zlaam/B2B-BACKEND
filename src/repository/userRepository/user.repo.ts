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
    const user = await this._db.select().from(userSchema).where(eq(userSchema.OTP_TOKEN, OTP_TOKEN)).limit(1);
    if (user.length === 0) {
      logger.info(
        "User not found while checking user exist in db or not. because he/she sent invalid token which doesn't exist in database(getUserByToken)"
      );
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }
    return user[0];
  }

  // ** Get user by email
  public async getUserByEmail(email: string, loggerErrorMessage?: string, orignalErrorMessage?: string): Promise<TUSER> {
    const user = await this._db.select().from(userSchema).where(eq(userSchema.email, email)).limit(1);
    if (user.length === 0) {
      logger.info(
        loggerErrorMessage ||
          "User not found while checking user exist in db or not. because he/she sent invalid email which doesn't exist in database(getUserByEmail)"
      );
      throwError(reshttp.notFoundCode, orignalErrorMessage ?? reshttp.notFoundMessage);
    }
    return user[0];
  }
  // ** get user by name

  public async getUserByusername(username: string): Promise<TUSER> {
    const user = await this._db.select().from(userSchema).where(eq(userSchema.username, username)).limit(1);
    if (user.length === 0) {
      logger.info("User not found in database  because he/she sent invalid username which doesn't exist in database(getUserByEmail)");
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }
    return user[0];
  }

  // ** Get user by uid

  public async getUserByuid(uid: string): Promise<TUSER> {
    const user = await this._db.select().from(userSchema).where(eq(userSchema.uid, uid)).limit(1);
    if (user.length === 0) {
      logger.info("User not found in database  because he/she sent invalid username which doesn't exist in database(getUserByEmail)");
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }
    return user[0];
  }
}
export const userRepo = (db: DatabaseClient) => new UserRepository(db);
