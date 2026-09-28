import type { NextFunction, Request, Response } from "express";
import { registerCategory } from "../services/category.service";


export async function register (req: Request, res: Response, next: NextFunction) {
  try {

    const category = await registerCategory(req.body)

    return res.status(201).json({category})
  } catch(err){
    return next(err)
  }
}