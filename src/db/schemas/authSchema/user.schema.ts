import { pgTable, timestamp, integer, text, index, uuid, boolean, varchar } from "drizzle-orm/pg-core";
import { userRoleEnum } from "../shared/enums";

export const userSchema = pgTable(
  "users",
  {
    uid: uuid("uid").defaultRandom().notNull().primaryKey().unique(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    fullName: varchar("fullName", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: text("password").notNull(),
    role: userRoleEnum().notNull(),
    country: varchar("country", { length: 50 }).notNull(),
    phone: varchar("phone", { length: 15 }).notNull().unique(),
    isVerified: boolean("isVerified").notNull().default(false),
    companyName: varchar("companyName", { length: 50 }),
    companyURI: varchar("companyAddress", { length: 1000 }),
    OTP_TOKEN: text("OTP_TOKEN").unique(),
    OTP_TOKEN_VERSION: integer("OTP_TOKEN_VERSION").notNull().default(0),
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
  },
  (table) => [
    index("user_role_idx").on(table.role),
    index("user_createdAt_idx").on(table.createdAt),
    index("fullName_idx").on(table.fullName),
    index("isVerified_idx").on(table.isVerified)
  ]
);
export type TUSER = typeof userSchema.$inferSelect;
export type TROLE = typeof userRoleEnum;
