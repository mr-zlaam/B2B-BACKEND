import { Router } from "express";
import { upload } from "../../middleware/globalMiddleware/multer.middleware";
// import { validator } from "../../middleware/globalMiddleware/validation.middleware";
// import { documentSubmissionSchemaZ } from "../../validation/documentSubmissionValidation/documentSubmission.validation";
import { documentSubmissionController } from "../../controller/documentSubmission/documentSubmission.controller";
import { database } from "../../db/db";
import { authMiddleware } from "../../middleware/globalMiddleware/auth.middleware";

export const documentSubmissionRouter: Router = Router();

// ** Upload Document
documentSubmissionRouter.route("/uploadDocument").post(
  upload,
  // validator(documentSubmissionSchemaZ),
  authMiddleware(database.db).checkToken,
  documentSubmissionController(database.db).submitDocumentController
);
