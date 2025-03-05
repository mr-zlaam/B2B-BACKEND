import { Router } from "express";

import applicationInsightCon from "../../controller/applicationInsightController/applicationInsights.controller.js";
export const applicationInsightRouter: Router = Router();

applicationInsightRouter.route("/").get(
  /** This is an example of how to use the rate limiter middleware
     * handle function will express req:Request, res:Response, next:NextFunction and then it will except point ratelimiter will consume then message and totalPoints and duration
     (req, res, next) =>
       rateLimiterMiddleware.handle(req, res, next, 10, undefined, 50, 10), */
  applicationInsightCon.getPerformance
);
