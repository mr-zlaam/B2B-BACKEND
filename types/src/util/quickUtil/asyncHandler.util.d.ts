import { type NextFunction, type Request, type Response } from "express";
type AsyncRequestHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;
declare const asyncHandler: <T>(
  requestHandler: AsyncRequestHandler<T>,
) => (req: Request, res: Response, next: NextFunction) => void;
export { asyncHandler };
