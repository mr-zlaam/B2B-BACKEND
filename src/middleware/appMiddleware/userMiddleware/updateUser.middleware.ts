import reshttp from "reshttp";
import type { DatabaseClient } from "../../../db/db.js";
import { type TUSER, userSchema } from "../../../db/schemas/user.schema.js";
import logger from "../../../util/globalUtil/logger.util.js";
import { throwError } from "../../../util/globalUtil/throwError.util.js";
import { and, eq, not, or } from "drizzle-orm";
import { asyncHandler } from "../../../util/globalUtil/asyncHandler.util.js";
import type { _Request } from "../../globalMiddleware/auth.middleware.js";

export class UserUpdateMiddleware {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  checkIfUserCanUpdate = asyncHandler(async (req: _Request, _, next) => {
    const updateUserInformation = req.body as TUSER;
    const { uid: userIdFromBody } = req.body as { uid: string };
    const userIDFromToken = req.userFromToken?.uid as string;
    if (!userIdFromBody && !userIDFromToken) {
      logger.info("No uid have been provided by user or token");
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    const uid = userIdFromBody || userIDFromToken || "no id";
    const { username, fullName, phone, companyURI, companyName } = updateUserInformation;
    const dataWhichIsGoingToBeUpdated = { username, fullName, phone, companyURI, companyName };
    logger.info("dataWhichIsGoingToBeUpdated", { dataWhichIsGoingToBeUpdated, uid });
    const checkIfUserExist = await this._db
      .select({ username: userSchema.username })
      .from(userSchema)
      .where(
        and(
          not(eq(userSchema.uid, uid)),
          or(eq(userSchema.username, dataWhichIsGoingToBeUpdated.username), eq(userSchema.phone, dataWhichIsGoingToBeUpdated.phone))
        )
      )
      .limit(1);
    if (checkIfUserExist.length > 0) {
      // ** user not found with the username you've entered ** //
      logger.info("user with this user detail is already exist in database.please try other username");
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }
    logger.info("run middleware");
    return next();
  });
  // ** Update userEmail ** //
  updateUserEmail = asyncHandler(async (req: _Request, _, next) => {
    const { email } = req.body as { email: string; userIDFromBody: string };
    const checkIfUserCanUpdateToThisEmail = await this._db.select().from(userSchema).where(eq(userSchema.email, email)).limit(1);
    if (checkIfUserCanUpdateToThisEmail.length > 0) {
      // ** user not found with the username you've entered ** //
      logger.info("user with this email is already exist in database.please try other email", { checkIfUserCanUpdateToThisEmail, email });
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }

    return next();
  });
}
