import { eq } from "drizzle-orm";
import { onboardingSchema, selectPartnershipSchema, type TUSER } from "../../../db/schemas";
import type { DatabaseClient } from "../../../db/db";
import type { TBUYERPARTNERSHIP, TVENDORPARTNERSHIP } from "../../../type/types";

export const unlockPartnership = async (
  db: DatabaseClient,
  user: TUSER,
  partnershipName: TVENDORPARTNERSHIP | TBUYERPARTNERSHIP,
  completed: boolean = false,
  retentionPeriod: number = 0,
  kpiPoints: number = 0,
  unlockedByPayment: boolean = false
) => {
  const [currentSelectedPartnerShipLevel] = await db
    .select()
    .from(selectPartnershipSchema)
    .where(eq(selectPartnershipSchema.userId, user.uid))
    .limit(1);
  if (!currentSelectedPartnerShipLevel) {
    await db
      .insert(selectPartnershipSchema)
      .values({
        userId: user.uid,
        partnershipName: partnershipName,
        unlockedAt: new Date(),
        completed: completed,
        retentionPeriod: retentionPeriod,
        kpiPoints: kpiPoints,
        unlockedByPayment: unlockedByPayment
      })
      .onConflictDoNothing();
  } else {
    await db.update(selectPartnershipSchema).set({}).where(eq(onboardingSchema.userId, user.uid));
  }
};
