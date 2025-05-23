import { boolean, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "../authSchema";

export const vendorOrBuyerAgreementSchema = pgTable("vendorAgreement", {
  id: serial("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => userSchema.uid, { onDelete: "cascade" })
    .unique(),
  agreementName: varchar("agreementName", { length: 100 }).notNull(),
  isSigned: boolean("isSigned").notNull().default(false),
  createdAt: timestamp("createdAt", {
    mode: "date",
    precision: 3
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    precision: 3
  })
    .notNull()
    .defaultNow()
});

export type TVendorOrBuyerAgreementSchema = typeof vendorOrBuyerAgreementSchema.$inferSelect;
