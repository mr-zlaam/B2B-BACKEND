import { Router } from "express";
import { AuthController } from "../../controller/userController/auth.controller";
import { validator } from "../../middleware/globalMiddleware/validation.middleware";
import { loginUserSchema, registerUserSchema, resendOTPSchema } from "../../validation/userValidation/auth.validation";
import { database } from "../../db/db";
import rateLimiterMiddleware from "../../middleware/globalMiddleware/ratelimiter.middleware";
import { Authmiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { GetUserController } from "../../controller/userController/getUser.controller";
export const authRouter: Router = Router();
const authController = new AuthController(database.db);
const authMiddleware = new Authmiddleware(database.db);
const getUserController = new GetUserController(database.db);
// ** Register User
authRouter.route("/registerUser").post(validator(registerUserSchema), authController.registerUser);
// ** Verify User
authRouter.route("/verifyUser").patch(authController.verifyUser);
// ** Resend OTP
authRouter.route("/resendOTP").post(
  validator(resendOTPSchema),
  // Rate limiter that user can get only 1 otp per 2 minutes
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 120);
  },
  authController.resendOTP
);

authRouter.route("/loginUser").post(
  validator(loginUserSchema),
  // Rate limiter that user can get only 1 otp per 2 minutes
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 5, 120);
  },
  authController.loginUser
);
// ** Refresh access Toke
authRouter.route("/refreshAccessToken").post(authController.refreshAccessToken);

// ** Register Moderator
authRouter.route("/registerAsModerator").post(validator(registerUserSchema), authController.registerAsModerator);

// ** Verify Moderator
authRouter
  .route("/verifyModerator/:username")
  .patch(/*Verification is done in controller*/ authMiddleware.checkToken, authMiddleware.checkIfUserIsAdmin, authController.verifyModerator);
// ** Get All User
authRouter.route("/getAllUser").get(authMiddleware.checkToken, authMiddleware.checkIfUserIsAdmin, getUserController.getAllUser);
// ** Get Current User: user specific only logged in user can access this
authRouter.route("/getCurrentUser").get(authMiddleware.checkToken, getUserController.getCurrentUser);
// ** Get Single User admin specific
authRouter.route("/getSingleUser/:username").get(authMiddleware.checkToken, authMiddleware.checkIfUserIsAdmin, getUserController.getSingleUser);
