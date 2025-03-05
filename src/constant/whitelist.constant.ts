import envConfig from "../config/env.config.js";
import logger from "../util/appUtil/logger.util.js";

const whitelist = envConfig.WHITE_LIST_MAILS;

logger.info(`Whitelist: ${whitelist}`);
