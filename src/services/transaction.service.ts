import { AppError } from "../errors/app-error";
import { findCategoryById } from "../repositories/category.repository";
import { createTransaction } from "../repositories/transaction.repository";
import type { CreateTransactionData } from "../schemas/transaction.schema";

export async function registerTransaction(data: CreateTransactionData) {
  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError("CATEGORY_NOT_FOUND", "Categoria não encontrada", 404);
  }

  const transaction = await createTransaction(data);

  return transaction;
}
