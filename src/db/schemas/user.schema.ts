import {
  pgTable,
  timestamp,
  text,
  index,
  uuid,
  varchar,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
export const userRoleEnum = pgEnum("userRole", ["ADMIN", "VENDOR", "BUYER"]);

export const userSchema = pgTable(
  "users",
  {
    uid: uuid("uid").notNull().primaryKey().unique(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    fullName: varchar("fullName", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: text("password").notNull(),
    role: userRoleEnum("role").notNull(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
  },
  (table) => [
    uniqueIndex("email_idx").on(table.email),
    uniqueIndex("username_idx").on(table.username),
    index("role_idx").on(table.role),
    index("createdAt_idx").on(table.createdAt),
    index("updatedAt_idx").on(table.updatedAt),
    index("fullName_idx").on(table.fullName),
  ],
);
export type IUSER = typeof userSchema.$inferSelect;
