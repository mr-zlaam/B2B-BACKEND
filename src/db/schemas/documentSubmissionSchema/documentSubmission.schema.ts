import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "..";

export const documentSubmissionSchema = pgTable("documentSubmission", {
  id: serial("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => userSchema.uid, { onDelete: "cascade" })
    .unique(),
  bussinessRegisterationDocument: text("bussinessRegisterationDocument").notNull().unique(),
  businessLicenseDocument: text("businessLicenseDocument").notNull().unique(),
  ContactPersonAdhaarCardDocment: text("ContactPersonAdhaarCardDocment").notNull().unique(),
  artisanIdCardDocument: text("artisanIdCardDocument").default("").unique(),
  bankStatementDocument: text("bankStatementDocument").notNull().unique(),
  productCatalogueDocument: text("productCatalogueDocument").notNull().unique(),
  certificationsDocument: text("certificationsDocument").notNull().unique(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
    precision: 3
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
    precision: 3
  })
    .notNull()
    .defaultNow()
});

export type TDOCUMENTSUBMISSION = typeof documentSubmissionSchema.$inferSelect;
