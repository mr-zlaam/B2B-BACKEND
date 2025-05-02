import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import {
  type TBUSINESSCONTACTINFORMATION,
  type TBUSSINESSINFORMATION,
  type TBUSSINESSCREDIBILITYASSESSMENT,
  type TBANKINGINFORMATION,
  bussinessInformationSchema,
  bussinessContactInformationSchema,
  businessCredibilityAssessmentSchema,
  bankingInformationSchema
} from "../../db/schemas";
import { eq } from "drizzle-orm";
import { throwError } from "../../util/globalUtil/throwError.util";
class UpdateApplicationSubmissionController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public updateBusinessInformation = asyncHandler(async (req: _Request, res) => {
    const businessInformation = req.body as TBUSSINESSINFORMATION;
    const id = Number(req.params.id);
    await this._db.transaction(async (tx) => {
      await tx.update(bussinessInformationSchema).set(businessInformation).where(eq(bussinessInformationSchema.id, id));
    });

    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Business information updated successfully!"
    });
  });

  // 2. Controller to update Business Contact Information by ID
  public updateBusinessContactInformation = asyncHandler(async (req: _Request, res) => {
    const businessContactInformation = req.body as TBUSINESSCONTACTINFORMATION;
    const id = Number(req.params.id);

    await this._db.transaction(async (tx) => {
      await tx.update(bussinessContactInformationSchema).set(businessContactInformation).where(eq(bussinessContactInformationSchema.id, id));
    });

    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Business contact information updated successfully!"
    });
  });

  // 3. Controller to update Business Credibility Assessment by ID
  public updateBusinessCredibilityAssessment = asyncHandler(async (req: _Request, res) => {
    const businessCredibilityAssessment = req.body as TBUSSINESSCREDIBILITYASSESSMENT;
    const id = req.params.id;
    if (!id) {
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    await this._db.transaction(async (tx) => {
      await tx
        .update(businessCredibilityAssessmentSchema)
        .set(businessCredibilityAssessment)
        .where(eq(businessCredibilityAssessmentSchema.id, Number(id)));
    });

    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Business credibility assessment updated successfully!"
    });
  });

  // 4. Controller to update Banking Information by ID
  public updateBankingInformation = asyncHandler(async (req: _Request, res) => {
    const bankingInformation = req.body as TBANKINGINFORMATION;
    const id = req.params.id;

    await this._db.transaction(async (tx) => {
      await tx.update(bankingInformationSchema).set(bankingInformation).where(eq(bankingInformationSchema.id, id));
    });

    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, {
      message: "Banking information updated successfully!"
    });
  });
}
export const updateApplicationSubmissionController = (db: DatabaseClient) => new UpdateApplicationSubmissionController(db);
