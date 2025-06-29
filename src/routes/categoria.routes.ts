import { Router } from "express";
import {
    createCategoriaHandle,
    deleteCategoriaHandle,
    getCategoriaByIDHandle,
    getCategoriasHandle,
    updateCategoriaHandle
} from "../controllers/categoria.controller";
import { autenticacaoMiddleware } from "../middlewares/authRoutes.middleware";

const router = Router();

// CRUD
router.get("/search", getCategoriasHandle);
router.get("/:id", getCategoriaByIDHandle);
router.post("/", autenticacaoMiddleware, createCategoriaHandle);
router.put("/:id", autenticacaoMiddleware, updateCategoriaHandle);
router.delete("/:id", autenticacaoMiddleware, deleteCategoriaHandle);

export default router;