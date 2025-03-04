import { Router } from "express";
import { applicationInsightRouter } from "./applicationInsightRouter/applicationInsight.router.js";

export const defaultRouter: Router = Router();

defaultRouter.use("/getApplicationInsights", applicationInsightRouter);
