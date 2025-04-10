import { Router } from "express";
import { AuthController } from "../../controller/userController/auth.controller.js";
import { validator } from "../../middleware/validation.middleware.js";
import { authValidationSchema } from "../../validation/userValidation/auth.validation.js";
import { database } from "../../db/db.js";
export const authRouter: Router = Router();

const authController = new AuthController(database.db);
// ** Register User
authRouter.route("/registerUser").post(validator(authValidationSchema), authController.registerUser);
// ** Verify User
authRouter.route("/verifyUser").post(authController.verifyUser);
