import { AppError } from "../errors/app-error";

import {
  createCategory,
  findCategoryById,
  findCategoryByName,
  findCategories,
  updateCategoryById,
  deleteCategory,
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
  const categoryToRemove = await findCategoryById(id);

  if (!categoryToRemove) {
    throw new AppError(
      "CATEGORY_NOT_FOUND",
      "Categoria não encontrada.",
      404,
    );
  }

  await deleteCategory(id);
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