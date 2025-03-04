import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";
import envConfig from "../config/env.config.js";
import appConstant from "../constant/app.constant.js";
import logger from "../util/appUtil/logger.util.js";
import { throwError } from "../util/appUtil/throwError.util.js";
import reshttp from "reshttp";
import { replaceAllPlaceholders } from "../util/quickUtil/ replaceAllPlaceholders.util.js";
import { generateRandomStrings } from "../util/quickUtil/slugStringGenerator.util.js";

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.com",
  port: 587,
  secure: false,

  auth: {
    user: envConfig.HOST_EMAIL,
    pass: envConfig.HOST_EMAIL_SECRET,
  },
});

export async function gloabalMailMessage(
  to: string,
  message?: string | null,
  subject?: string,
  header?: string,
  addsOn?: string,
  senderIntro?: string,
) {
  const templatePath = path.resolve(
    __dirname,
    "../../templates/globalEmail.template.html",
  );
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");
  const placeholders = {
    companyname: appConstant.COMPANY_NAME,
    senderIntro: senderIntro || "",
    message: message || "",
    header: header || "",
    addsOn: addsOn || "",
  };
  htmlTemplate = replaceAllPlaceholders(htmlTemplate, placeholders);
  const randomStr = generateRandomStrings(10);
  const mailOptions = {
    from: envConfig.HOST_EMAIL,
    to: to,
    subject: subject ?? appConstant.COMPANY_NAME,
    html: htmlTemplate,
    headers: {
      "X-Auto-Response-Suppress": "All",
      Precedence: "bulk",
      "Auto-Submitted": "auto-generated",
      "Message-ID": `<${randomStr}.dev>`,
    },

    replyTo: "support@b2b.com",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email message sent successfully: ${info.response}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error Email message sending :${error.message}`);
      throwError(
        reshttp.internalServerErrorCode,
        reshttp.internalServerErrorMessage,
      );
    }
    logger.error(`Error sending Email  message:${error as string}`);
    throwError(
      reshttp.internalServerErrorCode,
      reshttp.internalServerErrorMessage,
    );
  }
}
