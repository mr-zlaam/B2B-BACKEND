import { Router } from "express";
import { AuthController } from "../../controller/userController/auth.controller";
import { validator } from "../../middleware/globalMiddleware/validation.middleware";
import { loginUserSchema, registerUserSchema, resendOTPSchema } from "../../validation/userValidation/auth.validation";
import { database } from "../../db/db";
import rateLimiterMiddleware from "../../middleware/globalMiddleware/ratelimiter.middleware";
import { Authmiddleware } from "../../middleware/globalMiddleware/auth.middleware";
import { OnBoardingController } from "../../controller/onBoardingController/onboarding.controller";
export const authRouter: Router = Router();
const authController = new AuthController(database.db);
const authMiddleware = new Authmiddleware(database.db);
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

const onBoardingController = new OnBoardingController(database.db);
authRouter.route("/getAllUserWithOnboarding").get(onBoardingController.getAllUserWithOnboarding);
