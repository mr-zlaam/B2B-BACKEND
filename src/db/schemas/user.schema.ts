import { pgTable, timestamp, text, index, uuid, boolean, varchar, pgEnum } from "drizzle-orm/pg-core";
export const userRoleEnum = pgEnum("role", ["ADMIN", "MODERATOR", "VENDOR", "BUYER"]);

export const userSchema = pgTable(
  "users",
  {
    uid: uuid("uid").notNull().primaryKey().unique(),
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
    OTP_EXPIRY: timestamp("OTP_EXPIRY"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull()
  },
  (table) => [
    index("role_idx").on(table.role),
    index("createdAt_idx").on(table.createdAt),
    index("updatedAt_idx").on(table.updatedAt),
    index("fullName_idx").on(table.fullName),
    index("otp_token_expiry_idx").on(table.OTP_EXPIRY),
    index("isVerified_idx").on(table.isVerified)
  ]
);
export type IUSER = typeof userSchema.$inferSelect;
