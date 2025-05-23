import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import { vendorOrBuyerAgreementSchema, type TVendorOrBuyerAgreementSchema } from "../../db/schemas/vendorOrBuyerAgreementSchema";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import { and, eq } from "drizzle-orm";
import { throwError } from "../../util/globalUtil/throwError.util";
import logger from "../../util/globalUtil/logger.util";
import { promoteUserToNextLevelInOnboarding } from "../../util/appUtil/authUtil/promoteUserToNextLevelInOnboarding.util";
import { userSchema } from "../../db/schemas";

class VendorOrBuyerAgreementController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public createVendorOrBuyerAgreement = asyncHandler(async (req: _Request, res) => {
    const { agreementName } = req.body as TVendorOrBuyerAgreementSchema;
    const [checkIfUserHasSignedThisAgreementBefore] = await this._db
      .select()
      .from(vendorOrBuyerAgreementSchema)
      .where(and(eq(vendorOrBuyerAgreementSchema.userId, req.userFromToken!.uid), eq(vendorOrBuyerAgreementSchema.agreementName, agreementName)));
    if (checkIfUserHasSignedThisAgreementBefore) {
      logger.warn("User has signed this agreement already!!");
      return throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }
    await this._db
      .insert(vendorOrBuyerAgreementSchema)
      .values({ userId: req.userFromToken!.uid, isSigned: true, agreementName: agreementName })
      .onConflictDoNothing();
    const user = await this._db.query.users.findFirst({
      where: eq(userSchema.uid, req.userFromToken!.uid),
      with: { onboarding: true }
    });
    await promoteUserToNextLevelInOnboarding(this._db, user!, user!.onboarding.currentOnboardingStageIndex);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: `${agreementName} has been signed successfully` });
  });
  public getCurrentUsersAllSignedAgreement = asyncHandler(async (req: _Request, res) => {
    const allSignedAgreements = await this._db.query.vendorOrBuyerAgreementSchema.findMany({
      where: eq(vendorOrBuyerAgreementSchema.userId, req.userFromToken!.uid)
    });
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { data: allSignedAgreements });
  });
}
export const vendorOrBuyerAgreementController = (db: DatabaseClient) => new VendorOrBuyerAgreementController(db);
