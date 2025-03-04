import type { Request, Response } from "express";
declare const jsonResponse: (
  status: number,
  message?: string,
  data?: object | null | object[],
  metaData?: object | null | object[],
  optMessage?: string,
) => {
  success: boolean;
  statusCode: number;
  message: string;
  data: object | object[] | null;
  metaData: object | object[] | null;
  optMessage: string;
};
declare const httpResponse: (
  req: Request,
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown,
) => Response;
export { jsonResponse, httpResponse };
