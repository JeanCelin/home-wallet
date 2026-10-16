import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export function requireJsonAccept(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.accepts("application/json")) {
    return next(
      new AppError(
        "CONTENT_NEGOCIATION_INVALID",
        "Esta API aceita respostas em JSON.",
        406,
      ),
    );
  }

  next();
}
