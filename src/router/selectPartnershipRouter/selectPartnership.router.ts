import { Router } from "express";
import { selectPartnershipController } from "../../controller/selectPartnershipController/selectPartnership.controller";
import { database } from "../../db/db";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { selectPartnershipMiddleware } from "../../middleware/appMiddleware/selectPartnershipMiddleware/selectPartnership.middleware";

export const selectPartnershipRouter: Router = Router();

selectPartnershipRouter
  .route("/unlockPartnershipWithoutPayment/:applicationId")
  .post(
    authMiddleware(database.db).checkToken,
    selectPartnershipMiddleware(database.db).processLevelWithoutPayment,
    selectPartnershipController(database.db).unlockPartnershipWithoutPayment
  );
selectPartnershipRouter
  .route("/unlockPartnershipByPayment/:partnershipLevelIndex")
  .post(
    authMiddleware(database.db).checkToken,
    selectPartnershipMiddleware(database.db).processLevelWithPayment,
    selectPartnershipController(database.db).unlockPartnershipByPayment
  );
