import { index, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { bussinessLegalStructureEnum, bussinessTypeEnum } from "../../shared/enums";
import { applicationSubmissionSchema } from "../applicationSubmission.schema";

export const bussinessInformationSchema = pgTable(
  "bussinessInformation",
  {
    id: serial("id").notNull().primaryKey(),
    // fk
    applicationSubmissionId: integer("applicationSubmissionId")
      .notNull()
      .references(() => applicationSubmissionSchema.id),
    bussinessName: varchar("bussinessInformation", { length: 100 }).notNull(),
    bussinessLegalStructure: bussinessLegalStructureEnum().notNull(),
    bussinessType: bussinessTypeEnum().notNull(),
    bussinessRegistrationNumber: integer("bussinessRegistrationNumber").notNull().unique(),
    brandAffiliations: varchar("brandAffiliation", { length: 150 }),
    // address
    streetLine1: varchar("streetLine1", { length: 500 }).notNull(),
    streetLine2: varchar("streetLine2", { length: 500 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    stateORRegion: varchar("stateORRegion", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    postalCode: varchar("postalCode", { length: 20 }).notNull(),
    websiteURI: varchar("websiteURI", { length: 200 }),
    annualTurnover: varchar("annualTurnover", { length: 200 }).notNull(),
    gstNumber: varchar("gstNumber", { length: 15 }).notNull().unique(),
    taxIdentificationNumber: varchar("taxIdentificationNumber", { length: 25 }).notNull().unique()
  },
  (table) => [
    index("bussinessInformation_bussinessName_idx").on(table.bussinessName),
    index("bussinessInformation_bussinessType_idx").on(table.bussinessType),
    index("bussinessInformation_country_idx").on(table.country),
    index("bussinessInformation_city_idx").on(table.city)
  ]
);
export type TBUSSINESSINFORMATION = typeof bussinessInformationSchema.$inferSelect;
