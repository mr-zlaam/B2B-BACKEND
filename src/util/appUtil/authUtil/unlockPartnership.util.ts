import { selectPartnershipSchema, type TUSER } from "../../../db/schemas";
import type { DatabaseClient } from "../../../db/db";
import {
  ReturnKpiPointsBasedOnIndex,
  ReturnPartnershipLevelBasedOnSerialNumber,
  ReturnRetentionPeriodBasedOnIndex
} from "../../globalUtil/partnershipAndOnboardingLevelCalculator.util";
import { and, eq } from "drizzle-orm";
import logger from "../../globalUtil/logger.util";
export const unlockPartnershipWithoutPayment = async (db: DatabaseClient, user: TUSER, partnershipLevelIndex: number, completed: boolean = false) => {
  const [currentSelectedPartnerShipLevel] = await db
    .select()
    .from(selectPartnershipSchema)
    .where(and(eq(selectPartnershipSchema.userId, user.uid), eq(selectPartnershipSchema.partnershipLevelIndex, partnershipLevelIndex + 1)))
    .limit(1);
  if (currentSelectedPartnerShipLevel) {
    logger.info("You've already unlocked this level");
    return;
  }
  await db
    .insert(selectPartnershipSchema)
    .values({
      userId: user.uid,
      partnershipName: ReturnPartnershipLevelBasedOnSerialNumber(partnershipLevelIndex ? partnershipLevelIndex + 1 : 1, user.role),
      partnershipLevelIndex: partnershipLevelIndex + 1,
      completed,
      requiredRetentionPeriod: ReturnRetentionPeriodBasedOnIndex(partnershipLevelIndex ? partnershipLevelIndex + 1 : 1),
      requiredKpiPoints: ReturnKpiPointsBasedOnIndex(partnershipLevelIndex ? partnershipLevelIndex + 1 : 1)
    })
    .onConflictDoNothing();
};

export const unlockPartnershipWithPayment = async (
  db: DatabaseClient,
  user: TUSER,
  partnershipLevelIndex: number,
  completed: boolean,
  unlockedByPayment: boolean = true
) => {
  const [currentSelectedPartnerShipLevel] = await db
    .select()
    .from(selectPartnershipSchema)
    .where(and(eq(selectPartnershipSchema.userId, user.uid), eq(selectPartnershipSchema.partnershipLevelIndex, partnershipLevelIndex + 1)))
    .limit(1);
  if (!unlockedByPayment) {
    if (currentSelectedPartnerShipLevel) {
      logger.info("You've already unlocked this level");
      return;
    }
  }
  await db
    .insert(selectPartnershipSchema)
    .values({
      userId: user.uid,
      partnershipName: ReturnPartnershipLevelBasedOnSerialNumber(partnershipLevelIndex, user.role),
      partnershipLevelIndex: partnershipLevelIndex,
      completed,
      requiredRetentionPeriod: ReturnRetentionPeriodBasedOnIndex(partnershipLevelIndex),
      requiredKpiPoints: ReturnKpiPointsBasedOnIndex(partnershipLevelIndex),
      unlockedByPayment
    })
    .onConflictDoNothing();
};
