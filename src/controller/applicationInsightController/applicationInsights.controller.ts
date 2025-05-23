import reshttp from "reshttp";
import type { Request, Response } from "express";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import SystemInsights from "../../util/globalUtil/systemInsights.util";
class PerformanceController {
  static getPerformance = (req: Request, res: Response) => {
    try {
      const healthData = {
        applicationHealth: SystemInsights.getApplicationHealth(),
        systemHealth: SystemInsights.getSystemHealth()
      };
      httpResponse(req, res, reshttp.okCode, reshttp.okMessage, healthData);
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: reshttp.internalServerErrorCode,
          message: error.message || reshttp.internalServerErrorMessage
        };
      }
    }
  };
}

export default PerformanceController;
