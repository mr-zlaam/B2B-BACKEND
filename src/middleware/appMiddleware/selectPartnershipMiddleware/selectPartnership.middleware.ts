import reshttp from "reshttp";
import type { NextFunction, Response } from "express";
import type { DatabaseClient } from "../../../db/db";
import { asyncHandler } from "../../../util/globalUtil/asyncHandler.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import logger from "../../../util/globalUtil/logger.util";
import { selectPartnershipRepo } from "../../../repository/selectPartnershipRepository/selectPartnership.repo";
import type { _Request } from "../../globalMiddleware/auth.middleware";
import { and, eq } from "drizzle-orm";
import { userSchema } from "../../../db/schemas";

class SelectPartnershipMiddleware {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }

  public processLevelWithoutPayment = asyncHandler(async (req, _, next) => {
    const { applicationId } = req.params;
    if (!applicationId) {
      logger.warn("applicationId is required!");
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }

    const selectPartnership = await selectPartnershipRepo(this._db).getUserSelectPartnershipByApplicationId(applicationId);
    if (!selectPartnership) {
      logger.warn("Application not found!");
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }

    next();
  });
  // ** processLevelWithPayment
  public processLevelWithPayment = asyncHandler(async (req: _Request, _: Response, next: NextFunction) => {
    const { partnershipLevelIndex } = req.params;
    if (!partnershipLevelIndex) {
      logger.warn("partnershipLevelIndex is required!");
      throwError(reshttp.badRequestCode, "partnershipLevelIndex is required");
    }
    const uid = req.userFromToken?.uid;
    if (!uid) {
      logger.warn("uid is required!");
      return throwError(reshttp.badRequestCode, "uid is required");
    }
    // ** check if it is number
    const integerPartnershipLevelIndex = Number(partnershipLevelIndex);
    if (integerPartnershipLevelIndex === 5 || integerPartnershipLevelIndex === 6 || integerPartnershipLevelIndex === 7) {
      logger.warn("You are not allowed to Buy 5,6,7 level partnership. You have to go through without payment process");
      throwError(reshttp.forbiddenCode, reshttp.forbiddenMessage);
    }
    const partnershipAlreadyUnlocked = await this._db.query.users.findFirst({
      where: and(eq(userSchema.uid, uid)),
      columns: { uid: true },
      with: { selectPartnership: true }
    });
    if (
      partnershipAlreadyUnlocked?.selectPartnership?.some(
        (selectPartnership) => selectPartnership.partnershipLevelIndex === integerPartnershipLevelIndex
      )
    ) {
      logger.warn("You have already unlocked this partnership level");
      throwError(reshttp.badRequestCode, "You have already unlocked this partnership level");
    }
    //TODO: *** Integration with payment gateway
    next();
  });
}
export const selectPartnershipMiddleware = (db: DatabaseClient) => new SelectPartnershipMiddleware(db);
