import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import { eq } from "drizzle-orm";
import { userSchema } from "../../db/schemas";

export class OnBoardingController {
  private _db: DatabaseClient;
  public constructor(db: DatabaseClient) {
    this._db = db;
  }
  public getAllUserWithOnboarding = asyncHandler(async (req, res) => {
    const allUsers = await this._db.query.users.findMany({
      where: eq(userSchema.role, "VENDOR"),
      columns: {
        uid: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      with: {
        onboarding: true
      }
    });

    if (!allUsers) {
      return res.status(reshttp.notFoundCode).json({
        message: reshttp.notFoundMessage
      });
    }

    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, allUsers);
  });
}
