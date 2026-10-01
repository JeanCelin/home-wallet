import type { NextFunction, Request, Response } from "express";
import { updateCategory, registerCategory } from "../services/category.service";


export async function register (req: Request, res: Response, next: NextFunction) {
  try {

    const category = await registerCategory(req.body)

    return res.status(201).json({category})
  } catch(err){
    return next(err)
  }
}

export async function update (req: Request, res: Response, next: NextFunction){
  try {
    const id = Number(req.params.id)

    const category = await updateCategory({
      id, 
      name: req.body.name
    })
    return res.status(200).json({category})
  } catch(err){
    return next(err)
  }
}