import { index, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { applicationSubmissionSchema } from "../applicationSubmission.schema";

export const bussinessContactInformationSchema = pgTable(
  "bussinessContactInformationSchema",
  {
    id: serial("id").notNull().primaryKey(),
    // fk
    applicationSubmissionId: integer("applicationSubmissionId")
      .notNull()
      .references(() => applicationSubmissionSchema.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    bussinessRegistrationNumber: integer("bussinessRegistrationNumber").notNull().unique(),
    phoneNumber: varchar("phoneNumber", { length: 15 }).notNull().unique(),
    whatsappNumber: varchar("whatsappNumber", { length: 15 }).unique(),
    bussinessAddress: varchar("bussinessAddress", { length: 500 }).notNull(),
    district: varchar("district", { length: 50 }).notNull(),
    state: varchar("state", { length: 50 }),
    country: varchar("country", { length: 50 })
  },
  (table) => [index("bussinessInformation_name_idx").on(table.name)]
);
export type TBUSINESSCONTACTINFORMATION = typeof bussinessContactInformationSchema.$inferSelect;
