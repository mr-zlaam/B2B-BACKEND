import { Router } from "express";
import { selectPartnershipController } from "../../controller/selectPartnershipController/selectPartnership.controller";
import { database } from "../../db/db";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";

export const selectPartnershipRouter: Router = Router();

selectPartnershipRouter
  .route("/unlockPartnershipWithoutPayment")
  .post(authMiddleware(database.db).checkToken, selectPartnershipController(database.db).unlockPartnershipByRequirements);
