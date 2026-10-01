import type { NextFunction, Request, Response } from "express";
import { transactionSchema } from "../schemas/transaction.schema";
import { registerTransaction } from "../services/transaction.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = transactionSchema.parse(req.body);
    const transaction = await registerTransaction(data);

    return res.status(201).json({ transaction });
  } catch (err) {
    next(err);
  }
}
