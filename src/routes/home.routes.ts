import { Router } from "express";
import { homeHandle } from "../controllers/home.controller";

const router = Router();

router.get("/", homeHandle);

export default router;