import { Router } from "express";

import applicationInsightCon from "../../controller/applicationInsights/applicationInsights.controller.js";
export const applicationInsightRouter: Router = Router();

applicationInsightRouter.route("/").get(applicationInsightCon.getPerformance);
