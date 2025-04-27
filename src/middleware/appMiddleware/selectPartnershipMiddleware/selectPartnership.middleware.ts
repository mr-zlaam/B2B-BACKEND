import reshttp from "reshttp";
import type { DatabaseClient } from "../../../db/db";
import { asyncHandler } from "../../../util/globalUtil/asyncHandler.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import logger from "../../../util/globalUtil/logger.util";
import { selectPartnershipRepo } from "../../../repository/selectPartnershipRepository/selectPartnership.repo";

class SelectPartnershipMiddleware {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }

  public checkApplicationId = asyncHandler(async (req, _, next) => {
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
}
export const selectPartnershipMiddleware = (db: DatabaseClient) => new SelectPartnershipMiddleware(db);
