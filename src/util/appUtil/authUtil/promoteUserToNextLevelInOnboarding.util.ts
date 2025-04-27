import { eq } from "drizzle-orm";
import { onboardingSchema, type TUSER } from "../../../db/schemas";
import type { DatabaseClient } from "../../../db/db";
import { ReturnOnboardingLevelBasedOnSerialNumber } from "../../globalUtil/partnershipAndOnboardingLevelCalculator.util";

export const promoteUserToNextLevelInOnboarding = async (db: DatabaseClient, user: TUSER, currentOnboardingStageIndex: number) => {
  const [currentONboardingStatus] = await db.select().from(onboardingSchema).where(eq(onboardingSchema.userId, user.uid)).limit(1);
  if (!currentONboardingStatus) {
    await db
      .insert(onboardingSchema)
      .values({
        userId: user.uid,
        currentOnboardingStage: ReturnOnboardingLevelBasedOnSerialNumber(currentOnboardingStageIndex),
        currentOnboardingStageIndex
      })
      .onConflictDoNothing();
  } else {
    await db
      .update(onboardingSchema)
      .set({
        currentOnboardingStage: ReturnOnboardingLevelBasedOnSerialNumber(currentONboardingStatus.currentOnboardingStageIndex + 1),
        currentOnboardingStageIndex: currentONboardingStatus.currentOnboardingStageIndex + 1
      })
      .where(eq(onboardingSchema.userId, user.uid));
  }
};
