import type { Request, Response } from "express";
import geopip from "geoip-lite";
import reshttp from "reshttp";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { throwError } from "../../util/globalUtil/throwError.util";
export default {
  detectCountry: (req: Request, res: Response) => {
    const ip = req.ip as string;
    if (!ip) throwError(reshttp.badRequestCode, "IP not found");
    if (ip === "::1" || ip === "127.0.0.1") throwError(reshttp.badRequestCode, "Local Host detected can't find any country");
    const data = geopip.lookup(ip);
    const country = data?.country;
    if (!country) throwError(reshttp.badRequestCode, "Country not found");
    httpResponse(req, res, reshttp.okCode, "Country found successfully", {
      ...data,
      country
    });
  }
};
