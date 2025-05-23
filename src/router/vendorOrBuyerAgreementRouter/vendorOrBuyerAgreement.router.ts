import { Router } from "express";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { database } from "../../db/db";
import { vendorOrBuyerAgreementController } from "../../controller/vendorOrBuyerAgreementController/vendorOrBuyerAgreement.controller";

export const vendorOrBuyerAgreementRouter: Router = Router();
vendorOrBuyerAgreementRouter
  .route("/createAgreement")
  .post(authMiddleware(database.db).checkToken, vendorOrBuyerAgreementController(database.db).createVendorOrBuyerAgreement);
vendorOrBuyerAgreementRouter
  .route("/getCurrentUsersAllSignedAgreement")
  .get(authMiddleware(database.db).checkToken, vendorOrBuyerAgreementController(database.db).getCurrentUsersAllSignedAgreement);
