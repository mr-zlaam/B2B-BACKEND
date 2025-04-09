import { Router } from "express";
import authController from "../../controller/userController/auth.controller.js";
import { validator } from "../../middleware/validation.middleware.js";
import { authValidationSchema } from "../../validation/userValidation/auth.validation.js";

export const authRouter: Router = Router();

authRouter.route("/registerUser").post(validator(authValidationSchema), authController.registerUser);
