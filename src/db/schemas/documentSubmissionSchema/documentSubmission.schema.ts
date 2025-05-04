import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "..";

export const documentSubmissionSchema = pgTable("documentSubmission", {
  id: serial("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => userSchema.uid, { onDelete: "cascade" })
    .unique(),
  bussinessRegisterationDocument: text("bussinessRegisterationDocument").notNull(),
  businessLicenseDocument: text("businessLicenseDocument").notNull(),
  ContactPersonAdhaarCardDocment: text("businessLicenseDocument").notNull(),
  artisanIdCardDocument: text("businessLicenseDocument"),
  bankStatementDocument: text("businessLicenseDocument").notNull(),
  productCatalogueDocument: text("businessLicenseDocument").notNull(),
  certificationsDocument: text("businessLicenseDocument").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});

export type TDOCUMENTSUBMISSION = typeof documentSubmissionSchema.$inferSelect;
