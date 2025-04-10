import type ms from "ms";
import envConfig from "../config/env.config.js";
import type { ICOOKIEOPTIONS } from "../type/types.js";
export default {
  COMPANY_NAME: "B2B",
  OTP_EXPIRY: "30m" as number | ms.StringValue | undefined,
  ACCESS_TOKEN_EXPIRY: "14m" as number | ms.StringValue | undefined,
  REFRESH_TOKEN_EXPIRY: "30d" as number | ms.StringValue | undefined,
  COOKIEOPTIONS: {
    ACESSTOKENCOOKIEOPTIONS: {
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(Date.now() + 14 * 60 * 1000) // 14 minutes in milliseconds
    } as ICOOKIEOPTIONS,
    REFRESHTOKENCOOKIEOPTIONS: {
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days in milliseconds
    } as ICOOKIEOPTIONS
  }
};
