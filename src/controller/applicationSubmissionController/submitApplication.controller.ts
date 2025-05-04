import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import { applicationSubmissionSchema, type TAPPLICATIONSUBMISSION } from "../../db/schemas/applicationSubmissionSchema";
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
  bankingInformationSchema,
  userSchema
} from "../../db/schemas";
import { promoteUserToNextLevelInOnboarding } from "../../util/appUtil/authUtil/promoteUserToNextLevelInOnboarding.util";
import { eq } from "drizzle-orm";
class ApplicationSubmissionController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public submitApplication = asyncHandler(async (req: _Request, res) => {
    const userId = req.userFromToken!.uid;
    const applicationSubmission = req.body as TAPPLICATIONSUBMISSION;
    const bunssinessInformation = req.body as TBUSSINESSINFORMATION;
    const bussinessContactInformation = req.body as TBUSINESSCONTACTINFORMATION;
    const businessCredibilityAssessment = req.body as TBUSSINESSCREDIBILITYASSESSMENT;
    const bankingInformation = req.body as TBANKINGINFORMATION;
    applicationSubmission.userId = userId;

    await this._db.transaction(async (tx) => {
      const [applicationSubmissionResult] = await tx.insert(applicationSubmissionSchema).values(applicationSubmission).returning();
      await tx.insert(bussinessInformationSchema).values({ ...bunssinessInformation, applicationSubmissionId: applicationSubmissionResult.id });
      await tx
        .insert(bussinessContactInformationSchema)
        .values({ ...bussinessContactInformation, applicationSubmissionId: applicationSubmissionResult.id });
      await tx
        .insert(businessCredibilityAssessmentSchema)
        .values({ ...businessCredibilityAssessment, applicationSubmissionId: applicationSubmissionResult.id });
      await tx.insert(bankingInformationSchema).values({ ...bankingInformation, applicationSubmissionId: applicationSubmissionResult.id });
    });
    const user = await this._db.query.users.findFirst({ where: eq(userSchema.uid, userId), with: { onboarding: true } });
    await promoteUserToNextLevelInOnboarding(this._db, user!, user!.onboarding.currentOnboardingStageIndex);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "Application has been submitted successfully!!" });
  });
}
export const applicationSubmissionController = (db: DatabaseClient) => new ApplicationSubmissionController(db);
