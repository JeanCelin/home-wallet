import { AppError } from "../errors/app-error";

import {
  createCategory,
  findCategoryById,
  findCategoryByName,
  findCategories,
  updateCategoryById,
  deleteCategory,
  hasTransactions,
} from "../repositories/category.repository";

type RegisterCategoryData = {
  name: string;
};

type UpdateCategoryData = {
  id: number;
  name: string;
};

export async function registerCategory(data: RegisterCategoryData) {
  const { name } = data;

  const existingCategory = await findCategoryByName(name);

  if (existingCategory) {
    throw new AppError(
      "CATEGORY_ALREADY_EXISTS",
      "Categoria já cadastrada",
      409,
    );
  }

  const category = await createCategory(name);
  return category;
}

export async function updateCategory(data: UpdateCategoryData) {
  const { id, name } = data;

  const category = await findCategoryById(id);

  if (!category) {
    throw new AppError(
      "CATEGORY_NOT_FOUND",
      "Categoria não encontrada",
      404,
    );
  }

  const categoryUpdated = await updateCategoryById(category.id, name);

  return categoryUpdated;
}

export async function getCategories() {
  return await findCategories();
}

export async function removeCategory(id: number) {
  const category = await findCategoryById(id);

  if (!category) {
    throw new AppError(
      "CATEGORY_NOT_FOUND",
      "Categoria não encontrada.",
      404,
    );
  }

    const transactionsCount = await hasTransactions(id);

  if (transactionsCount > 0) {
    throw new AppError(
      "CATEGORY_IN_USE",
      "Não é possível excluir uma categoria que possui transações.",
      409,
    );
  }

  await deleteCategory(id);
  return
}

export async function findCategory(id: number) {
  const category = await findCategoryById(id);

  if (!category) {
    throw new AppError(
      "CATEGORY_NOT_FOUND",
      "Categoria não encontrada",
      404,
    );
  }

  return category;
}