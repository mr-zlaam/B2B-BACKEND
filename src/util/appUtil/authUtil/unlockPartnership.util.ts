import { selectPartnershipSchema, type TUSER } from "../../../db/schemas";
import type { DatabaseClient } from "../../../db/db";
import {
  ReturnKpiPointsBasedOnIndex,
  ReturnPartnershipLevelBasedOnSerialNumber,
  ReturnRetentionPeriodBasedOnIndex
} from "../../globalUtil/partnershipAndOnboardingLevelCalculator.util";
export const unlockPartnership = async (
  db: DatabaseClient,
  user: TUSER,
  partnershipLevelIndex: number,
  completed: boolean = false,
  unlockedByPayment: boolean = false
) => {
  await db
    .insert(selectPartnershipSchema)
    .values({
      userId: user.uid,
      partnershipName: ReturnPartnershipLevelBasedOnSerialNumber(partnershipLevelIndex ?? 1, user.role),
      partnershipLevelIndex,
      completed,
      requiredRetentionPeriod: ReturnRetentionPeriodBasedOnIndex(partnershipLevelIndex ?? 1),
      requiredKpiPoints: ReturnKpiPointsBasedOnIndex(partnershipLevelIndex ?? 1),
      unlockedByPayment
    })
    .onConflictDoNothing();
};
