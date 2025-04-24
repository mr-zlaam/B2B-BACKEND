import { eq } from "drizzle-orm";
import { onboardingSchema, type TUSER } from "../../../db/schemas";
import type { DatabaseClient } from "../../../db/db";
import { ReturnLevelBasedOnSerialNumber } from "../../globalUtil/partnershipLevelCalculator.util";

export const promoteUserToNextLevelInOnboarding = async (db: DatabaseClient, user: TUSER) => {
  const [currentONboardingStatus] = await db.select().from(onboardingSchema).where(eq(onboardingSchema.userId, user.uid)).limit(1);
  if (!currentONboardingStatus) {
    await db
      .insert(onboardingSchema)
      .values({ userId: user.uid, currentStage: ReturnLevelBasedOnSerialNumber(1), currentStageIndex: 1 })
      .onConflictDoNothing();
  } else {
    await db
      .update(onboardingSchema)
      .set({
        currentStage: ReturnLevelBasedOnSerialNumber(currentONboardingStatus.currentStageIndex + 1),
        currentStageIndex: currentONboardingStatus.currentStageIndex + 1
      })
      .where(eq(onboardingSchema.userId, user.uid));
  }
};
