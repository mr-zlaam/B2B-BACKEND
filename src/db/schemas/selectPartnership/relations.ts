import { relations } from "drizzle-orm";
import { selectPartnershipSchema } from "./selectpartnership.schema";
import { userSchema } from "../authSchema";

export const selectPartnershipRelations = relations(selectPartnershipSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [selectPartnershipSchema.userId],
    references: [userSchema.uid]
  })
}));
