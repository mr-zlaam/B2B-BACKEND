import { Router } from "express";
import { UpdateUserController } from "../../controller/userController/updateUser.controller.js";
import { database } from "../../db/db.js";
import { validator } from "../../middleware/globalMiddleware/validation.middleware.js";
import { updateUserEmailSchema, updateUserSchema } from "../../validation/userValidation/updateUser.validation.js";
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
  // Rate limiter that user can get only 1 otp per 2 minutes
  authMiddleware.checkToken,
  userUpdateMiddleware.checkIfUserCanUpdate,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.updateBasicInfo
);
// ** Update user email ** //
updateUserRouter.route("/updateUserEmail").patch(
  validator(updateUserEmailSchema),
  // Rate limiter that user can get only 1 otp per 2 minutes
  authMiddleware.checkToken,
  userUpdateMiddleware.updateUserEmail,
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 86400);
  },
  userUpdateController.updateUserEmail
);
