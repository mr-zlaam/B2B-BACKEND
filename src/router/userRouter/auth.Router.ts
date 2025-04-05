import { Router } from "express";
import authController from "../../controller/userController/auth.controller.js";

export const authRouter: Router = Router();

authRouter.route("/registerUser").post(authController.registerUser);
