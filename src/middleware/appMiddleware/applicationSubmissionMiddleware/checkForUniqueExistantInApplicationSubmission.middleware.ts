import { eq, or, ne, and } from "drizzle-orm";
import type { DatabaseClient } from "../../../db/db";
import {
  bankingInformationSchema,
  bussinessContactInformationSchema,
  bussinessInformationSchema,
  type TBANKINGINFORMATION,
  type TBUSINESSCONTACTINFORMATION,
  type TBUSSINESSINFORMATION
} from "../../../db/schemas";
import { asyncHandler } from "../../../util/globalUtil/asyncHandler.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import reshttp from "reshttp";
import logger from "../../../util/globalUtil/logger.util";

class CheckForUniqueExistantInApplicationSubmissionMiddleware {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public checkForUniqueExistantInApplicationSubmission = asyncHandler(async (req, _, next) => {
    const bunssinessInformation = req.body as TBUSSINESSINFORMATION;
    const bussinessContactInformation = req.body as TBUSINESSCONTACTINFORMATION;
    const bankingInformation = req.body as TBANKINGINFORMATION;

    const [checkIfbunssinessInformationExist] = await this._db
      .select()
      .from(bussinessInformationSchema)
      .where(
        or(
          eq(bussinessInformationSchema.bussinessRegistrationNumber, bunssinessInformation.bussinessRegistrationNumber),
          eq(bussinessInformationSchema.gstNumber, bunssinessInformation.gstNumber),
          eq(bussinessInformationSchema.taxIdentificationNumber, bunssinessInformation.taxIdentificationNumber)
        )
      )
      .limit(1);

    if (checkIfbunssinessInformationExist) {
      logger.info("bunssinessInformation already exist, check for bussinessRegistrationNumber, gstNumber or taxIdentificationNumber ", {
        checkIfbunssinessInformationExist
      });
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }
    const contactConditions = [
      eq(bussinessContactInformationSchema.email, bussinessContactInformation.email),
      eq(bussinessContactInformationSchema.phoneNumber, bussinessContactInformation.phoneNumber),
      eq(bussinessContactInformationSchema.bussinessRegistrationNumber, bussinessContactInformation.bussinessRegistrationNumber)
    ];

    if (bussinessContactInformation.whatsappNumber) {
      contactConditions.push(eq(bussinessContactInformationSchema.whatsappNumber, bussinessContactInformation.whatsappNumber));
    }

    const [checkIfContactInfoExists] = await this._db
      .select()
      .from(bussinessContactInformationSchema)
      .where(or(...contactConditions))
      .limit(1);

    if (checkIfContactInfoExists) {
      logger.info("Business contact information already exists, email, phoneNumber or business register number", { checkIfContactInfoExists });

      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }

    // Banking Information
    const [checkIfBankingInfoExists] = await this._db
      .select()
      .from(bankingInformationSchema)
      .where(
        or(
          eq(bankingInformationSchema.accountNumber, bankingInformation.accountNumber),
          eq(bankingInformationSchema.ibanCode, bankingInformation.ibanCode)
        )
      )
      .limit(1);

    if (checkIfBankingInfoExists) {
      logger.info("Banking information already exists");
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }
    return next();
  });
  // ** check for unique update
  public checkBusinessInfoUniqueness = asyncHandler(async (req, _, next) => {
    const bunssinessInformation = req.body as TBUSSINESSINFORMATION;
    const id = Number(req.params.id);

    if (!id) {
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    const [checkIfbunssinessInformationExist] = await this._db
      .select()
      .from(bussinessInformationSchema)
      .where(
        and(
          or(
            eq(bussinessInformationSchema.bussinessRegistrationNumber, bunssinessInformation.bussinessRegistrationNumber),
            eq(bussinessInformationSchema.gstNumber, bunssinessInformation.gstNumber),
            eq(bussinessInformationSchema.taxIdentificationNumber, bunssinessInformation.taxIdentificationNumber)
          ),
          ne(bussinessInformationSchema.id, id)
        )
      )
      .limit(1);

    if (checkIfbunssinessInformationExist) {
      logger.info("bunssinessInformation already exist", {
        checkIfbunssinessInformationExist
      });
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }

    return next();
  });

  // 2. Middleware to check Business Contact Information uniqueness
  public checkBusinessContactUniqueness = asyncHandler(async (req, _, next) => {
    const bussinessContactInformation = req.body as TBUSINESSCONTACTINFORMATION;
    const id = Number(req.params.id);
    if (!id) {
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    const contactConditions = [
      eq(bussinessContactInformationSchema.email, bussinessContactInformation.email),
      eq(bussinessContactInformationSchema.phoneNumber, bussinessContactInformation.phoneNumber),
      eq(bussinessContactInformationSchema.bussinessRegistrationNumber, bussinessContactInformation.bussinessRegistrationNumber)
    ];

    if (bussinessContactInformation.whatsappNumber) {
      contactConditions.push(eq(bussinessContactInformationSchema.whatsappNumber, bussinessContactInformation.whatsappNumber));
    }

    const [checkIfContactInfoExists] = await this._db
      .select()
      .from(bussinessContactInformationSchema)
      .where(and(or(...contactConditions), ne(bussinessContactInformationSchema.id, id)))
      .limit(1);

    if (checkIfContactInfoExists) {
      logger.info("Business contact information already exists", {
        checkIfContactInfoExists
      });
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }

    return next();
  });

  // 3. Middleware to check Banking Information uniqueness
  public checkBankingInfoUniqueness = asyncHandler(async (req, _, next) => {
    const bankingInformation = req.body as TBANKINGINFORMATION;
    const id = req.params.id;

    if (!id) {
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    const [checkIfBankingInfoExists] = await this._db
      .select()
      .from(bankingInformationSchema)
      .where(
        and(
          or(
            eq(bankingInformationSchema.accountNumber, bankingInformation.accountNumber),
            eq(bankingInformationSchema.ibanCode, bankingInformation.ibanCode)
          ),
          ne(bankingInformationSchema.id, id)
        )
      )
      .limit(1);

    if (checkIfBankingInfoExists) {
      logger.info("Banking information already exists", {
        checkIfBankingInfoExists
      });
      throwError(reshttp.conflictCode, reshttp.conflictMessage);
    }

    return next();
  });
}

export const checkForUniqueExistantInApplicationSubmissionMiddleware = (db: DatabaseClient) =>
  new CheckForUniqueExistantInApplicationSubmissionMiddleware(db);
