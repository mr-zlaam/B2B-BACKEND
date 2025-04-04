import reshttp from "reshttp";
import { type IUSER } from "../../db/schemas/user.schema.js";
import { httpResponse } from "../../util/globalUtil/apiResponse.util.js";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util.js";
import { checkExistingUser, handleUnverifiedUser, handleVerifiedUser, handleNewUser } from "../../util/appUtil/authUtil/userAuth.util.js";

export default {
  createUser: asyncHandler(async (req, res) => {
    const userBody = req.body as IUSER;
    // TODO: VALIDATION NEEDED
    /*
     * 1. Check if user already exists ✔️
     * 2. If user exists then check if he/she is verified️️ ️✔️
     * 3. If user exists and is verified then return error otherwise send otp token to verify his/her account ✔️
     * 4. If user does not exist then create new user
     */
    const existingUser = await checkExistingUser(userBody.email, userBody.username, userBody.phone);
    if (existingUser && existingUser.length > 0) {
      const user = existingUser[0];
      if (user.isVerified) {
        handleVerifiedUser();
      } else {
        await handleUnverifiedUser(userBody, res);
      }
    }
    /* if user doesn't exist at all*/
    await handleNewUser(userBody, res);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "Please check your email account for verification" });
  })
};
