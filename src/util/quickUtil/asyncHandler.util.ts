import { type NextFunction, type Request, type Response } from "express";
// eslint-disable-next-line no-unused-vars
type AsyncRequestHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;
const asyncHandler = <T>(requestHandler: AsyncRequestHandler<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
