import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import { applicationSubmissionSchema, type TAPPLICATIONSUBMISSION } from "../../db/schemas/applicationSubmissionSchema";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";

class ApplicationSubmissionController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public submitApplication = asyncHandler(async (req: _Request, res) => {
    const userId = req.userFromToken!.uid;
    const applicationSubmission = req.body as TAPPLICATIONSUBMISSION;
    applicationSubmission.userId = userId;
    await this._db.insert(applicationSubmissionSchema).values(applicationSubmission);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "Application has been submitted successfully!!" });
  });
}
export const applicationSubmissionController = (db: DatabaseClient) => new ApplicationSubmissionController(db);
