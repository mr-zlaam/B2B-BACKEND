import { pgTable, serial } from "drizzle-orm/pg-core";

export const selectPartnershipSchema = pgTable("selectPartnership", {
  id: serial("id").primaryKey().notNull()
});
