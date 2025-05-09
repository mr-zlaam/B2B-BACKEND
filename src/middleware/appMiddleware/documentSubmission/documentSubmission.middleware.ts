import type { DatabaseClient } from "../../../db/db";
import { documentSubmissionSchema } from "../../../db/schemas/documentSubmissionSchema";
import { asyncHandler } from "../../../util/globalUtil/asyncHandler.util";
import type { _Request } from "../../globalMiddleware/auth.middleware";
import { throwError } from "../../../util/globalUtil/throwError.util";
import reshttp from "reshttp";
import { eq } from "drizzle-orm";
import path from "node:path";
import fs from "node:fs";
class DocumentSubmissionMiddleware {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public checkIfDocumentsAreAlreadySubmittedMiddleware = asyncHandler(async (req: _Request, _, next) => {
    const uid = req.userFromToken!.uid;
    const documents = await this._db.select().from(documentSubmissionSchema).where(eq(documentSubmissionSchema.userId, uid)).limit(1);
    if (documents.length > 0) {
      throwError(reshttp.conflictCode, "Documents has been uploaded already");
    }

    const uploadDirectory = path.join(process.cwd(), "public/upload/");
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    next();
  });
}
export const documentSubmissionMiddleware = (db: DatabaseClient) => new DocumentSubmissionMiddleware(db);
