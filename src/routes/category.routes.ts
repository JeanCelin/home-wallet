import { Router } from "express";
import {register, update, get} from "../controllers/category.controller"

const router = Router()

router.post("/", register)
router.put("/:id", update )
router.get("/", get)

export default router;