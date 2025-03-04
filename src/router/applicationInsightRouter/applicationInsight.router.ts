import { Router } from "express";

import applicationInsightCon from "../../controller/applicationInsightController/applicationInsights.controller.js";
export const applicationInsightRouter: Router = Router();

applicationInsightRouter.route("/").get(applicationInsightCon.getPerformance);
