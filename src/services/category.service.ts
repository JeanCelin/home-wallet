import { AppError } from "../errors/app-error";
import {
  createCategory,
  findCategoryByName,
} from "../repositories/category.repository";

type RegisterCategoryData = {
  name: string
}

export async function registerCategory(data: RegisterCategoryData) {

  const {name} = data

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
    return category
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

export async function findCategory(name: string) {
  if (!name)
    throw new AppError(
      "VALIDATION_ERROR",
      "Forneça uma categoria  para a busca",
      409,
    );

  try {
    const category = await findCategoryByName(name);

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
