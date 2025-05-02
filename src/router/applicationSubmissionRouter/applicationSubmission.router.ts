import { Router } from "express";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { database } from "../../db/db";
import { validator } from "../../middleware/globalMiddleware/validation.middleware";
import { businessInformationSchemaZ } from "../../validation/applicationSubmissionValidation/bussinessInformation.validation";
import { applicationSubmissionController } from "../../controller/applicationSubmissionController/submitApplication.controller";
import { businessCredibilityAssessmentSchemaZ } from "../../validation/applicationSubmissionValidation/businessCredibilityAssessment.validation";
import { bankingInformationSchemaZ } from "../../validation/applicationSubmissionValidation/bankingInformation.validation";
import { businessContactInformationSchemaZ } from "../../validation/applicationSubmissionValidation/bussinessContactInformation.validation";
import { checkForUniqueExistantInApplicationSubmissionMiddleware } from "../../middleware/appMiddleware/applicationSubmissionMiddleware/checkForUniqueExistantInApplicationSubmission.middleware";
import { updateApplicationSubmissionController } from "../../controller/applicationSubmissionController/updateApplication.controller";

export const applicationSubmissionRouter: Router = Router();

applicationSubmissionRouter
  .route("/submitApplication")
  .post(
    authMiddleware(database.db).checkToken,
    validator(businessInformationSchemaZ),
    validator(businessContactInformationSchemaZ),
    validator(businessCredibilityAssessmentSchemaZ),
    validator(bankingInformationSchemaZ),
    checkForUniqueExistantInApplicationSubmissionMiddleware(database.db).checkForUniqueExistantInApplicationSubmission,
    applicationSubmissionController(database.db).submitApplication
  );
// ** update
applicationSubmissionRouter
  .route("/updateBusinessInformation/:id")
  .patch(
    authMiddleware(database.db).checkToken,
    validator(businessInformationSchemaZ),
    checkForUniqueExistantInApplicationSubmissionMiddleware(database.db).checkBusinessInfoUniqueness,
    updateApplicationSubmissionController(database.db).updateBusinessInformation
  );
applicationSubmissionRouter
  .route("/updateBusinessContactInformation/:id")
  .patch(
    authMiddleware(database.db).checkToken,
    validator(businessContactInformationSchemaZ),
    checkForUniqueExistantInApplicationSubmissionMiddleware(database.db).checkBusinessContactUniqueness,
    updateApplicationSubmissionController(database.db).updateBusinessContactInformation
  );

applicationSubmissionRouter
  .route("/updateBusinessCredibilityAssessment/:id")
  .patch(
    authMiddleware(database.db).checkToken,
    validator(businessCredibilityAssessmentSchemaZ),
    updateApplicationSubmissionController(database.db).updateBusinessCredibilityAssessment
  );
applicationSubmissionRouter
  .route("/updateBankingInformation/:id")
  .patch(
    authMiddleware(database.db).checkToken,
    validator(bankingInformationSchemaZ),
    checkForUniqueExistantInApplicationSubmissionMiddleware(database.db).checkBankingInfoUniqueness,
    updateApplicationSubmissionController(database.db).updateBankingInformation
  );
