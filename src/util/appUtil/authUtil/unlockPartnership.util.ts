import { eq } from "drizzle-orm";
import { onboardingSchema, selectPartnershipSchema, type TUSER } from "../../../db/schemas";
import type { DatabaseClient } from "../../../db/db";
import { ReturnPartnershipLevelBasedOnSerialNumber } from "../../globalUtil/partnershipAndOnboardingLevelCalculator.util";
export const unlockPartnership = async (
  db: DatabaseClient,
  user: TUSER,
  partnershipLevelIndex: number,
  requiredRetentionPeriod: number = 0,
  requiredKpiPoints: number = 0,
  completed: boolean = false,
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
        partnershipName: ReturnPartnershipLevelBasedOnSerialNumber(partnershipLevelIndex, user.role),
        partnershipLevelIndex,
        completed,
        requiredRetentionPeriod,
        requiredKpiPoints,
        unlockedByPayment
      })
      .onConflictDoNothing();
  } else {
    await db.update(selectPartnershipSchema).set({}).where(eq(onboardingSchema.userId, user.uid));
  }
};
