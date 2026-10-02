import type { NextFunction, Request, Response } from "express";
import {
  transactionIdSchema,
  transactionSchema,
} from "../schemas/transaction.schema";
import {
  registerTransaction,
  editTransaction,
  getTransactions,
} from "../services/transaction.service";

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
1;
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = transactionIdSchema.parse(req.params);
    const data = transactionSchema.parse(req.body);
    const transaction = await editTransaction(id, data);

    return res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const transactions = await getTransactions();

    return res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
}
