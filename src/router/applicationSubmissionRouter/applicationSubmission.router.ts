import { Router } from "express";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { database } from "../../db/db";
import { validator } from "../../middleware/globalMiddleware/validation.middleware";
import { businessInformationSchemaZ } from "../../validation/applicationSubmissionValidation/bussinessInformation.validation";
import { applicationSubmissionController } from "../../controller/applicationSubmissionController/applicationSubmission.controller";
import { businessCredibilityAssessmentSchemaZ } from "../../validation/applicationSubmissionValidation/businessCredibilityAssessment.validation";
import { bankingInformationSchemaZ } from "../../validation/applicationSubmissionValidation/bankingInformation.validation";
import { businessContactInformationSchemaZ } from "../../validation/applicationSubmissionValidation/bussinessContactInformation.validation";

export const applicationSubmissionRouter: Router = Router();

applicationSubmissionRouter
  .route("/submitApplication")
  .post(
    authMiddleware(database.db).checkToken,
    validator(businessInformationSchemaZ),
    validator(businessContactInformationSchemaZ),
    validator(businessCredibilityAssessmentSchemaZ),
    validator(bankingInformationSchemaZ),
    applicationSubmissionController(database.db).submitApplication
  );
