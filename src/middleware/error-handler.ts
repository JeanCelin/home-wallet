import type { Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function errorHandler(err: unknown, req: Request, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
    });
  }
}
