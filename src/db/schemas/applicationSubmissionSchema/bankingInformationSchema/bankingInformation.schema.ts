import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { applicationSubmissionSchema } from "..";

export const bankingInformationSchema = pgTable("bankingInformation", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  // fk

  applicationSubmissionId: integer("applicationSubmissionId")
    .notNull()
    .references(() => applicationSubmissionSchema.id),
  bankName: varchar("bankName", { length: 100 }).notNull(),
  accountType: varchar("accountType", { length: 100 }).notNull(),
  accountNumber: varchar("accountNumber", { length: 20 }).notNull().unique(),
  ifscCode: varchar("ifscCode", { length: 11 }).notNull(),
  swiftORBISCode: varchar("swiftCode", { length: 11 }).notNull(),
  ibanCode: varchar("ibanCode", { length: 34 }).notNull().unique(),
  bankingComplaints: jsonb("bankingComplaints").$type<Record<string, boolean>>().notNull().default({})
});
export type TBANKINGINFORMATION = typeof bankingInformationSchema.$inferInsert;
