import { Router } from "express";
import { create } from "../controllers/market.controller";

const router = Router()

router.post("/", create)

export default router