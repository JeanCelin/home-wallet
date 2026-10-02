import { Router } from "express";
import { register, update, get, remove } from "../controllers/transaction.controller";


const router = Router();

router.post("/", register);
router.put("/:id", update);
router.get("/", get)
router.delete("/:id", remove)

export default router