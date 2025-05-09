import { Router } from "express";
import { upload } from "../../middleware/globalMiddleware/multer.middleware";
// import { validator } from "../../middleware/globalMiddleware/validation.middleware";
// import { documentSubmissionSchemaZ } from "../../validation/documentSubmissionValidation/documentSubmission.validation";
import { documentSubmissionController } from "../../controller/documentSubmission/documentSubmission.controller";
import { database } from "../../db/db";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { documentSubmissionMiddleware } from "../../middleware/appMiddleware/documentSubmission/documentSubmission.middleware";

export const documentSubmissionRouter: Router = Router();

// ** Upload Document
documentSubmissionRouter.route("/uploadDocument").post(
  authMiddleware(database.db).checkToken,
  documentSubmissionMiddleware(database.db).checkIfDocumentsAreAlreadySubmittedMiddleware,
  upload,
  // validator(documentSubmissionSchemaZ),
  documentSubmissionController(database.db).submitDocumentController
);
