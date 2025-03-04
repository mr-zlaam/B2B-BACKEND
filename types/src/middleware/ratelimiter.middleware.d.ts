import type { NextFunction, Request, Response } from "express";
export declare class RateLimiterMiddleware {
  private rateLimiter;
  private currentTotalPoints;
  private currentDuration;
  handle(
    req: Request,
    res: Response,
    next: NextFunction,
    consumptionPoints?: number,
    message?: string,
    totalPoints?: number,
    duration?: number,
  ): Promise<void>;
  private isErrorLimiter;
  cleanUp(): Promise<void>;
}
declare const rateLimiterMiddleware: RateLimiterMiddleware;
export default rateLimiterMiddleware;
