import { AppError } from "../errors/app-error";
import { findCategoryById } from "../repositories/category.repository";
import {
  createTransaction,
  updateTransaction,
  findAllTransactions,
  deleteTransactionById,
  findTransactionById,
} from "../repositories/transaction.repository";
import type { CreateTransactionData } from "../schemas/transaction.schema";

export async function registerTransaction(data: CreateTransactionData) {
  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError("CATEGORY_NOT_FOUND", "Categoria não encontrada", 404);
  }

  const transaction = await createTransaction(data);

  return transaction;
}

export async function editTransaction(id: number, data: CreateTransactionData) {
  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError("CATEGORY_NOT_FOUND", "Categoria não encontrada", 404);
  }

  const transaction = await updateTransaction(id, data);

  return transaction;
}

export async function getTransactions() {
  return await findAllTransactions();
}

export async function removeTransaction(id: number) {
  const foundCategory = await findTransactionById(id);
  if (!foundCategory)
    throw new AppError(
      "TRANSACTION_NOT_FOUND",
      "Transação não encontrada, verifique o Id e tente novamente",
      404,
    );

  await deleteTransactionById(id);

  return;
}
