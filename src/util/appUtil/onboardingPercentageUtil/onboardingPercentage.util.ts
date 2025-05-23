import reshttp from "reshttp";
import { throwError } from "../../globalUtil/throwError.util";
import type { DatabaseClient } from "../../../db/db";
import logger from "../../globalUtil/logger.util";
import { eq, sql } from "drizzle-orm";
import { onboardingSchema } from "../../../db/schemas";

export const updateOnboardingPercentage = async (uid: string, stepIndex: number, db: DatabaseClient) => {
  if (!uid || !stepIndex) {
    logger.info("uid and percentage are required");
    throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
  }
  const onboarding = await db.query.onboarding.findFirst({
    where: eq(onboardingSchema.userId, uid)
  });

  if (!onboarding) {
    logger.info("onboarding not found");
    return throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
  }
  if (onboarding.onboardingStatusPercentage >= 100) {
    await db
      .update(onboardingSchema)
      .set({
        onboardingStatusPercentage: 100
      })
      .where(eq(onboardingSchema.userId, uid));
  }
  await db
    .update(onboardingSchema)
    .set({
      onboardingStatusPercentage: sql`${onboardingSchema.onboardingStatusPercentage} + ${returnPercentageBasedOnCurrentIndexCompletion(stepIndex)}`
    })
    .where(eq(onboardingSchema.userId, uid));
  return;
};

const returnPercentageBasedOnCurrentIndexCompletion = (index: number): number => {
  switch (index) {
    case 1:
      return 9;
    case 2:
      return 18;
    case 3:
      return 18;
    case 4:
      return 9;
    case 5:
      return 18;
    case 6:
      return 18;
    case 7:
      return 10;
    default:
      return throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
  }
};
