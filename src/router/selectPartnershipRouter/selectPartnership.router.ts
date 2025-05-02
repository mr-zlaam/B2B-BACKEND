import { Router } from "express";
import { selectPartnershipController } from "../../controller/selectPartnershipController/selectPartnership.controller";
import { database } from "../../db/db";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { selectPartnershipMiddleware } from "../../middleware/appMiddleware/selectPartnershipMiddleware/selectPartnership.middleware";
import { validator } from "../../middleware/globalMiddleware/validation.middleware";
import { loginIntoApplicationSchemaZ } from "../../validation/selectPartnershipValidation/selectPartnership.validatation";

export const selectPartnershipRouter: Router = Router();

selectPartnershipRouter
  .route("/updateKpiAndRetenionAndunlockPartnershipLevelWithoutPayment/:applicationId")
  .post(
    authMiddleware(database.db).checkToken,
    selectPartnershipMiddleware(database.db).processLevelWithoutPayment,
    selectPartnershipController(database.db).updateKpiAndRetenionAndunlockPartnershipLevelWithoutPayment
  );
selectPartnershipRouter
  .route("/unlockPartnershipByPayment/:partnershipLevelIndex")
  .post(
    authMiddleware(database.db).checkToken,
    selectPartnershipMiddleware(database.db).processLevelWithPayment,
    selectPartnershipController(database.db).unlockPartnershipByPayment
  );
selectPartnershipRouter
  .route("/loginIntoApplication")
  .post(validator(loginIntoApplicationSchemaZ), selectPartnershipController(database.db).loginIntoApplication);
