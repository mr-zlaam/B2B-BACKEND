import { Router } from "express";
import { UpdateUserController } from "../../controller/userController/updateUser.controller.js";
import { database } from "../../db/db.js";
import { validator } from "../../middleware/globalMiddleware/validation.middleware.js";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserSchema
} from "../../validation/userValidation/updateUser.validation.js";
import { Authmiddleware } from "../../middleware/globalMiddleware/auth.middleware.js";
import rateLimiterMiddleware from "../../middleware/globalMiddleware/ratelimiter.middleware.js";
import { UserUpdateMiddleware } from "../../middleware/appMiddleware/userMiddleware/updateUser.middleware.js";

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
updateUserRouter.route("/updatePassword").patch(
  // Rate limiter will double the time every time user  will hit the limit
  validator(updateUserPasswordSchema),
  authMiddleware.checkToken,
  userUpdateMiddleware.checkIfUserCanUpdatePassword,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.updateUserPassword
);
updateUserRouter.route("/forgetPasswordRequest").patch(
  validator(forgetPasswordSchema),
  // Rate limiter will double the time every time user  will hit the limit
  userUpdateMiddleware.checkIfUserCanForgetPassword,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.forgotPasswordRequestFromUser
);
// ** Reset  and update password ** //
updateUserRouter.route("/forgetPasswordRequest").patch(validator(resetPasswordSchema), userUpdateController.resetAndUpdateNewPassword);
