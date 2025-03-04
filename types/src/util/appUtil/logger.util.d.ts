import winston from "winston";
import "winston-daily-rotate-file";
export declare const colorizeLevel: (level: string) => string;
declare const logger: winston.Logger;
export default logger;
