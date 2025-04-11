import { Router } from "express";
import { AuthController } from "../../controller/userController/auth.controller.js";
import { validator } from "../../middleware/validation.middleware.js";
import { registerUserSchema, resendOTPSchema } from "../../validation/userValidation/auth.validation.js";
import { database } from "../../db/db.js";
import rateLimiterMiddleware from "../../middleware/ratelimiter.middleware.js";
export const authRouter: Router = Router();
const authController = new AuthController(database.db);
// ** Register User
authRouter.route("/registerUser").post(validator(registerUserSchema), authController.registerUser);
// ** Verify User
authRouter.route("/verifyUser").post(authController.verifyUser);
// ** Resend OTP
authRouter.route("/resendOTP").post(
  validator(resendOTPSchema),
  // Rate limiter that user can get only 1 otp per 2 minutes
  async (req, res, next) => {
    await rateLimiterMiddleware.handle(req, res, next, 1, undefined, 1, 120);
  },
  authController.resendOTP
);
