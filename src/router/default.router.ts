import { Router } from "express";
import { applicationInsightRouter } from "./applicationInsightRouter/applicationInsight.router";
import { countryDetectorRouter } from "./countryDetectorRouter/countryDetector.router";
import { authRouter } from "./userRouter/auth.router";
import { updateUserRouter } from "./userRouter/updateUser.router";
import { selectPartnershipRouter } from "./selectPartnershipRouter/selectPartnership.router";
import { applicationSubmissionRouter } from "./applicationSubmissionRouter/applicationSubmission.router";
import { documentSubmissionRouter } from "./documentSubmissionRouter/documentSubmission.router";

export const defaultRouter: Router = Router();

defaultRouter.use("/getApplicationInsights", applicationInsightRouter);
defaultRouter.use("/detect-country", countryDetectorRouter);
// *** User
defaultRouter.use("/user", authRouter);
defaultRouter.use("/user", updateUserRouter);
// *** Select Partnership
defaultRouter.use("/selectPartnership", selectPartnershipRouter);
// *** Application Submission
defaultRouter.use("/applicationSubmission", applicationSubmissionRouter);
// *** Docuement submission router
defaultRouter.use("/documentSubmission", documentSubmissionRouter);
