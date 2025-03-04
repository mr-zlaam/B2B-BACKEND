import type { Response } from "express";
export declare const passwordHasher: (
  password: string,
  res: Response,
) => Promise<string | Response<any, Record<string, any>>>;
export declare const verifyPassword: (
  password: string,
  existingPassword: string,
  res: Response,
) => Promise<boolean | Response>;
