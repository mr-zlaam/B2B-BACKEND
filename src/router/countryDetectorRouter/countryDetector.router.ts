import { Router } from "express";
import countryDetectController from "../../controller/countryDetectController/countryDetect.controller";

export const countryDetectorRouter: Router = Router();
countryDetectorRouter.route("/").get(countryDetectController.detectCountry);
