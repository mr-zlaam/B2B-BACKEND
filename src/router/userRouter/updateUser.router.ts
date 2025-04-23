import { Router } from "express";
import { UpdateUserController } from "../../controller/userController/updateUser.controller";
import { database } from "../../db/db";
import { validator } from "../../middleware/globalMiddleware/validation.middleware";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserSchema
} from "../../validation/userValidation/updateUser.validation";
import { Authmiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import rateLimiterMiddleware from "../../middleware/globalMiddleware/ratelimiter.middleware";
import { UserUpdateMiddleware } from "../../middleware/appMiddleware/userMiddleware/updateUser.middleware";

// ** classess
const userUpdateController = new UpdateUserController(database.db);
const authMiddleware = new Authmiddleware(database.db);
const userUpdateMiddleware = new UserUpdateMiddleware(database.db);
export const updateUserRouter: Router = Router();
// ** Update user details (username,fullName,phone,companyName(optional), companyURI(optional)) ** //
updateUserRouter.route("/updateBasicInfo").patch(
  validator(updateUserSchema),
  // Rate limiter will double the time every time user  will hit the limit
  authMiddleware.checkToken,
  userUpdateMiddleware.checkIfUserCanUpdateBasicInfo,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.updateBasicInfo
);
// ** Update user email ** //
updateUserRouter.route("/updateUserEmail").patch(
  validator(updateUserEmailSchema),
  // Rate limiter will double the time every time user  will hit the limit
  authMiddleware.checkToken,
  userUpdateMiddleware.checkIfUserCanUpdateEmail,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.updateUserEmail
);
// ** Update user email ** //
updateUserRouter.route("/updateUserPassword").patch(
  // Rate limiter will double the time every time user  will hit the limit
  validator(updateUserPasswordSchema),
  authMiddleware.checkToken,
  userUpdateMiddleware.checkIfUserCanUpdatePassword,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.updateUserPassword
);
updateUserRouter.route("/forgetUserPasswordRequest").patch(
  validator(forgetPasswordSchema),
  // Rate limiter will double the time every time user  will hit the limit
  userUpdateMiddleware.checkIfUserCanForgetPassword,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.forgotPasswordRequestFromUser
);
// ** Reset  and update password ** //
updateUserRouter.route("/resetAndUpdateNewPassword").patch(validator(resetPasswordSchema), userUpdateController.resetAndUpdateNewPassword);
// ** Delete User **//
updateUserRouter.route("/deleteUser/:uid").delete(authMiddleware.checkToken, authMiddleware.checkIfUserIsAdmin, userUpdateController.deleteUser);
// ** Logout User **//
updateUserRouter.route("/logoutUser").post(authMiddleware.checkToken, userUpdateController.logoutUser);
