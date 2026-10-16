import type { NextFunction, Request, Response } from "express";
import { registerMarket } from "../services/market.service";

export async function create (req: Request, res: Response, next: NextFunction ){
  try {
    const {name } = req.body
    const market = await registerMarket(name)
    return res.status(201).json({market})
  } catch(err){
    next(err)
  }
}