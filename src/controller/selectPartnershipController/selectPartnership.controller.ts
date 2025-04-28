import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import { type TSELECTPARTERSHIP } from "../../db/schemas";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import logger from "../../util/globalUtil/logger.util";
import { throwError } from "../../util/globalUtil/throwError.util";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { selectPartnershipService } from "../../service/appService/selectPartnershipService/selectPartnership.service";
export class SelectPartnershipController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }

  // ** Unlock Partnership by fullfilling the requirements
  public updateKpiAndRetenionAndunlockPartnershipLevelWithoutPayment = asyncHandler(async (req: _Request, res) => {
    const { kpiPointsAchievedByUser, retentionPeriodAchievedByUser } = req.body as TSELECTPARTERSHIP;
    const { applicationId } = req.params;
    if (!kpiPointsAchievedByUser || !retentionPeriodAchievedByUser) {
      logger.info("Invalid kpi points or retention period");
      return throwError(reshttp.badRequestCode, "Invalid kpi points or retention period");
    }
    const userId = req.userFromToken?.uid;
    if (!userId) {
      logger.info("userid is required!");
      return throwError(reshttp.notFoundCode, "User not found");
    }
    await selectPartnershipService(this._db).updateKpiAndRetenionAndunlockPartnershipLevelWithoutPayment(
      req,
      res,
      userId,
      applicationId,
      retentionPeriodAchievedByUser,
      kpiPointsAchievedByUser
    );
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Partnership level has been completed successfully and User have been promoted to next level"
    });
  });
  // ** unlockPartnershipByPayment
  public unlockPartnershipByPayment = asyncHandler(async (req: _Request, res) => {
    const { partnershipLevelIndex } = req.params;
    const userId = req.userFromToken?.uid;
    if (!userId) {
      logger.info("userid is required!");
      return throwError(reshttp.notFoundCode, "User not found");
    }
    await selectPartnershipService(this._db).unlockPartnershipWithPayment(userId, +partnershipLevelIndex);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Partnership level has been completed successfully and User have been promoted to next level"
    });
  });
}

export const selectPartnershipController = (db: DatabaseClient) => new SelectPartnershipController(db);
