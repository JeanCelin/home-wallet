import { Router } from "express";
import { register } from "../controllers/transaction.controller";


const router = Router();

router.post("/", register);

export default router