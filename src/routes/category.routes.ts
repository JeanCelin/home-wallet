import { Router } from "express";
import {register, update} from "../controllers/category.controller"

const router = Router()

router.post("/", register)
router.put("/:id", update )


export default router;