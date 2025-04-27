import reshttp from "reshttp";
import { throwError } from "../../globalUtil/throwError.util";

export function canAccessNextLevel(
  unlockedAtTimestamp: string | number | Date,
  retentionPeriodAchievedByUser: number,
  kpiPointsAchievedByUser: number,
  requiredKpiPoints: number
) {
  const unlockedDate = new Date(unlockedAtTimestamp);
  if (isNaN(unlockedDate.getTime())) {
    throwError(reshttp.badRequestCode, "Invalid date format");
  }
  const currentDate = new Date();
  const targetDate = new Date(unlockedDate);
  targetDate.setMonth(targetDate.getMonth() + retentionPeriodAchievedByUser);
  const DidUserFullfillretentionperiodRequirement = currentDate >= targetDate;
  const DidUserFullfillkpiPointsRequirement = kpiPointsAchievedByUser >= Math.min(requiredKpiPoints, 10);
  return { DidUserFullfillretentionperiodRequirement, DidUserFullfillkpiPointsRequirement };
}
