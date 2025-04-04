import envConfig from "../../../config/env.config.js";

export const isAdmin = (email: string) => {
  return envConfig.WHITE_LIST_MAILS.includes(email);
};
