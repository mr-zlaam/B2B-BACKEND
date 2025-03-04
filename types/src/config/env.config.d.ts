interface IENVIRONMENTCONFIG {
  PORT: number;
  DATABASE_URI: string;
  JWT_SECRET: string;
  BACKEND_API_URI: string;
  FRONTEND_APP_URI: string;
  NODE_ENV: string;
  HOST_EMAIL: string;
  HOST_EMAIL_SECRET: string;
  WHITE_LIST_MAILS: string;
}
declare const _default: IENVIRONMENTCONFIG;
export default _default;
