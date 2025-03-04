import type { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
  success?: boolean;
  status?: number;
}
export declare const notFoundHandler: (
  req: Request,
  __: Response,
  next: NextFunction,
) => void;
export declare const errorHandler: (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
export {};
