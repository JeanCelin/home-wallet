import { AppError } from "../errors/app-error";

import { Prisma } from "../generated/prisma/client";

import { findCategoryById } from "../repositories/category.repository";

import {
  createTransaction,
  updateTransaction,
  findAllTransactions,
  deleteTransactionById,
  findTransactionById,
  transactionSummary,
} from "../repositories/transaction.repository";

import type { CreateTransactionData } from "../schemas/transaction.schema";

import type { TransactionFilters } from "../types/transaction-filters";

import { sub } from "../utils/calc";

import { calendarDateToDate, getToday } from "../utils/date";

export async function registerTransaction(data: CreateTransactionData) {
  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError(
      "CATEGORY_NOT_FOUND",
      "Categoria não encontrada",
      404,
    );
  }

  const date = calendarDateToDate(data.date ?? getToday());

  return createTransaction(data, date);
}

export async function editTransaction(
  id: number,
  data: CreateTransactionData,
) {
  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError(
      "CATEGORY_NOT_FOUND",
      "Categoria não encontrada",
      404,
    );
  }

  const date = data.date
    ? calendarDateToDate(data.date)
    : undefined;

  return updateTransaction(id, data, date);
}

export async function getTransactions(filters: TransactionFilters) {
  return await findAllTransactions(filters);
}

export async function removeTransaction(id: number) {
  const foundTransaction = await findTransactionById(id);

  if (!foundTransaction) {
    throw new AppError(
      "TRANSACTION_NOT_FOUND",
      "Transação não encontrada, verifique o Id e tente novamente",
      404,
    );
  }

  await deleteTransactionById(id);
}

export async function calcSummary() {
  const groupBy = await transactionSummary();

  let income: Prisma.Decimal = new Prisma.Decimal(0);
  let expense: Prisma.Decimal = new Prisma.Decimal(0);

  for (const group of groupBy) {
    if (group.type === "INCOME" && group._sum.amount != null) {
      income = group._sum.amount;
    } else if (group.type === "EXPENSE" && group._sum.amount != null) {
      expense = group._sum.amount;
    }
  }

  const balance = sub(income, expense);

  return {
    income,
    expense,
    balance,
  };
}