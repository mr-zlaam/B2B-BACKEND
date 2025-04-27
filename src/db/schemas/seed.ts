/* eslint-disable no-console */
import { eq } from "drizzle-orm";
import envConfig from "../../config/env.config";
import { partnershipData, userData } from "../../data/random.data";
import { promoteUserToNextLevelInOnboarding } from "../../util/appUtil/authUtil/promoteUserToNextLevelInOnboarding.util";
import { database, type DatabaseClient } from "../db";
import { userSchema } from "./authSchema";
import { selectPartnershipSchema } from "./selectPartnership";

// ** seeding user
export class Seeder {
  private _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }

  public seedUser = async () => {
    //** create admin
    const [, user2, user3] = await this._db.insert(userSchema).values(userData).onConflictDoNothing().returning();
    if (user2 && user3) {
      await Promise.all([promoteUserToNextLevelInOnboarding(this._db, user2), promoteUserToNextLevelInOnboarding(this._db, user3)]);
    }
    return;
  };

  public seedPartnershipData = async () => {
    const [buyer] = await this._db.select().from(selectPartnershipSchema).where(eq(selectPartnershipSchema.userId, userData[1].uid));
    const [vendor] = await this._db.select().from(selectPartnershipSchema).where(eq(selectPartnershipSchema.userId, userData[2].uid));
    if (!vendor) {
      await this._db.insert(selectPartnershipSchema).values(partnershipData[1]).onConflictDoNothing().returning();
    }
    if (!buyer) {
      await this._db.insert(selectPartnershipSchema).values(partnershipData[0]).onConflictDoNothing().returning();
    }
    return;
  };
}
const seeder = new Seeder(database.db);

export async function runSeeding() {
  console.log("Seeding started...");
  await Promise.all([envConfig.NODE_ENV === "development" && seeder.seedUser()]);
  await seeder.seedPartnershipData();
}
