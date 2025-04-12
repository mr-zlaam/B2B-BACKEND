import { eq, sql } from "drizzle-orm";
import type { DatabaseClient } from "../../../db/db.js";
import { userSchema, type TUSER } from "../../../db/schemas/user.schema.js";

export const userUpdateService = (db: DatabaseClient) => {
  // ** Update user details (username,fullName,phone,companyName(optional), companyURI(optional)) using drizzle orm ** //
  const updateBasicUserInformation = async (userInformation: TUSER) => {
    const { username, fullName, phone, companyURI, companyName } = userInformation;
    const dataWhichIsGoingToBeUpdated = { username, fullName, phone, companyURI, companyName };
    const [updatedUser] = await db
      .update(userSchema)
      .set({ ...dataWhichIsGoingToBeUpdated, updatedAt: new Date() })
      .where(eq(userSchema.username, username))
      .returning();
    return updatedUser;
  };
  // ** update user email **//
  const updateUserEmail = async (email: string, uid: string) => {
    const [updatedUser] = await db
      .update(userSchema)
      .set({ email, updatedAt: new Date(), isVerified: false, OTP_TOKEN_VERSION: sql`${userSchema.OTP_TOKEN_VERSION} + 1` })
      .where(eq(userSchema.uid, uid))
      .returning();
    return updatedUser;
  };
  // ** utility functions returns here
  return { updateBasicUserInformation, updateUserEmail };
};
