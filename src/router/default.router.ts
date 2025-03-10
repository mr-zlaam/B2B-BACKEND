import { Router } from "express";
import { applicationInsightRouter } from "./applicationInsightRouter/applicationInsight.router.js";
import { countryDetectorRouter } from "./countryDetectorRouter/countryDetector.router.js";

export const defaultRouter: Router = Router();

defaultRouter.use("/getApplicationInsights", applicationInsightRouter);
defaultRouter.use("/detect-country", countryDetectorRouter);
