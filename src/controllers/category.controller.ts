import type { NextFunction, Request, Response } from "express";
import {
  updateCategory,
  registerCategory,
  getCategories,
  removeCategory,
} from "../services/category.service";
import { categoryIdSchema, categorySchema } from "../schemas/category.schema";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = categorySchema.parse(req.body);

    const category = await registerCategory(data);

    return res.status(201).json({ category });
  } catch (err) {
    return next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = categoryIdSchema.parse(req.params);
    const { name } = categorySchema.parse(req.body);

    const category = await updateCategory({
      id,
      name,
    });
    return res.status(200).json({ category });
  } catch (err) {
    return next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await getCategories();

    return res.status(200).json({ categories });
  } catch (err) {
    return next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = categoryIdSchema.parse(req.params);
    await removeCategory(id);

    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}
