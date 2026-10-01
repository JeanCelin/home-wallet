import { AppError } from "../errors/app-error";
import {
  createCategory,
  findCategoryById,
  findCategoryByName,
  findCategories,
  updateCategoryById,
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

  if (!name) {
    throw new AppError("VALIDATION_ERROR", "Insira uma categoria", 409);
  }

  const existingCategory = await findCategoryByName(name);

  if (existingCategory) {
    throw new AppError(
      "CATEGORY_ALREADY_EXISTS",
      "Categoria já cadastrada",
      409,
    );
  }

  try {
    const category = await createCategory(name);
    return category;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      "INTERNAL_SERVER_ERROR",
      "Erro interno do servidor",
      500,
    );
  }
}

export async function updateCategory(data: UpdateCategoryData) {
  const { id, name } = data;
  if (!name)
    throw new AppError("VALIDATION_ERROR", "Categoria não inserida", 400);
  try {
    const category = await findCategoryById(id);
    if (!category)
      throw new AppError("CATEGORY_NOT_FOUND", "Categoria não encontrada", 404);

    const categoryUpdated = await updateCategoryById(category.id, name);
    return categoryUpdated;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      "INTERNAL_SERVER_ERROR",
      "Erro interno do servidor",
      500,
    );
  }
}

export async function getCategories() {
  try {
    const categories = findCategories();

    if (!categories)
      throw new AppError(
        "CATEGORY_NOT_FOUND",
        "Ainda não existe nenhuma categoria, crie uma.",
        400,
      );

    return categories;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      "INTERNAL_SERVER_ERROR",
      "Erro interno do servidor",
      500,
    );
  }
}

export async function findCategory(id: number) {
  if (!id)
    throw new AppError(
      "VALIDATION_ERROR",
      "Forneça uma categoria  para a busca",
      400,
    );

  try {
    const category = await findCategoryById(id);

    if (!category)
      throw new AppError("CATEGORY_NOT_FOUND", "Categoria não encontrada", 404);

    return category;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      "INTERNAL_SERVER_ERROR",
      "Erro interno do servidor",
      500,
    );
  }
}
