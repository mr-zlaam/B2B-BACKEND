import type { UploadApiResponse } from "cloudinary";
import type { DatabaseClient } from "../../db/db";
import { uploadOnCloudinary } from "../../service/globalService/cloudinary.service";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import { documentSubmissionSchema } from "../../db/schemas/documentSubmissionSchema";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { throwError } from "../../util/globalUtil/throwError.util";
import reshttp from "reshttp";
import logger from "../../util/globalUtil/logger.util";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { eq } from "drizzle-orm";
import { promoteUserToNextLevelInOnboarding } from "../../util/appUtil/authUtil/promoteUserToNextLevelInOnboarding.util";
import { userSchema } from "../../db/schemas";

class DocumentSubmissionController {
  private readonly _db: DatabaseClient;

  constructor(db: DatabaseClient) {
    this._db = db;
  }

  private uploadFile = async (file: Express.Multer.File): Promise<UploadApiResponse> => {
    // logger.info("here is file", { file, path: file.path })
    const fileType = file.path.split(".")[1];
    const response = await uploadOnCloudinary(file.path, file.filename, fileType);

    if (!response) {
      logger.error("Cloudinary upload failed", { file });
      return throwError(reshttp.internalServerErrorCode, `Failed to upload ${file.fieldname}`);
    }
    return response;
  };

  public submitDocumentController = asyncHandler(async (req: _Request, res) => {
    const files = req.files as {
      bussinessRegisterationDocument: [Express.Multer.File];
      businessLicenseDocument: [Express.Multer.File];
      ContactPersonAdhaarCardDocment: [Express.Multer.File];
      artisanIdCardDocument: [Express.Multer.File];
      bankStatementDocument: [Express.Multer.File];
      productCatalogueDocument: [Express.Multer.File];
      certificationsDocument: [Express.Multer.File];
    };
    const { uid } = req.userFromToken!;
    const newFiles = { files };
    // Upload all files in parallel with explicit field mapping
    const [
      bussinessRegResponse,
      businessLicenseResponse,
      adhaarCardResponse,
      artisanIdResponse,
      bankStatementResponse,
      productCatalogueResponse,
      certificationsResponse
    ] = await Promise.all([
      this.uploadFile(newFiles.files.bussinessRegisterationDocument[0]),
      this.uploadFile(newFiles.files.businessLicenseDocument[0]),
      this.uploadFile(newFiles.files.ContactPersonAdhaarCardDocment[0]),
      this.uploadFile(newFiles.files.artisanIdCardDocument[0]),
      this.uploadFile(newFiles.files.bankStatementDocument[0]),
      this.uploadFile(newFiles.files.productCatalogueDocument[0]),
      this.uploadFile(newFiles.files.certificationsDocument[0])
    ]);

    await this._db.transaction(async (tx) => {
      await tx.insert(documentSubmissionSchema).values({
        userId: uid,
        bussinessRegisterationDocument: bussinessRegResponse.secure_url,
        businessLicenseDocument: businessLicenseResponse.secure_url,
        ContactPersonAdhaarCardDocment: adhaarCardResponse.secure_url,
        artisanIdCardDocument: artisanIdResponse.secure_url ?? null,
        bankStatementDocument: bankStatementResponse.secure_url,
        productCatalogueDocument: productCatalogueResponse.secure_url,
        certificationsDocument: certificationsResponse.secure_url
      });
      const user = await tx.query.users.findFirst({
        where: eq(userSchema.uid, uid),
        with: { onboarding: true }
      });
      await promoteUserToNextLevelInOnboarding(this._db, user!, user!.onboarding.currentOnboardingStageIndex);
    });
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Document submitted successfully!!"
    });
  });
}

export const documentSubmissionController = (db: DatabaseClient) => new DocumentSubmissionController(db);
