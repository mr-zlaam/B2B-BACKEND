import { Router } from "express";
import countryDetectController from "../../controller/countryDetectController/countryDetect.controller.js";

export const countryDetectorRouter: Router = Router();
countryDetectorRouter.route("/").get(countryDetectController.detectCountry);
