import type { NextFunction, Request, Response } from "express";
import {
  transactionIdSchema,
  transactionQuerySchema,
  transactionSchema,
} from "../schemas/transaction.schema";
import {
  registerTransaction,
  editTransaction,
  getTransactions,
  removeTransaction,
  calcSummary,
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
    const filters = transactionQuerySchema.parse(req.query)

    const transactions = await getTransactions(filters);

    return res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = transactionIdSchema.parse(req.params);

    await removeTransaction(id);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

export async function summary(req: Request, res: Response, next: NextFunction) {
  try {
    const summary = await calcSummary();
    return res.status(200).json({ summary });
  } catch (err) {
    next(err);
  }
}
