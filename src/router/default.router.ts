import { Router } from "express";
import { applicationInsightRouter } from "./applicationInsightRouter/applicationInsight.router.js";
import { countryDetectorRouter } from "./countryDetectorRouter/countryDetector.router.js";
import { authRouter } from "./userRouter/auth.router.js";
import { updateUserRouter } from "./userRouter/updateUser.router.js";

export const defaultRouter: Router = Router();

defaultRouter.use("/getApplicationInsights", applicationInsightRouter);
defaultRouter.use("/detect-country", countryDetectorRouter);
// *** User
defaultRouter.use("/user", authRouter);
defaultRouter.use("/user", updateUserRouter);
