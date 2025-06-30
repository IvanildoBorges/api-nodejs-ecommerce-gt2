import { Router } from "express";
import {
    createProdutoHandle,
    deleteProdutoHandle,
    getProdutoByIDHandle,
    getProdutosHandle,
    updateProdutoHandle
} from "../controllers/produto.controller";
import { autenticacaoMiddleware } from "../middlewares/authRoutes.middleware";

const router = Router();

// CRUD
router.get("/search", getProdutosHandle);
router.get("/:id", getProdutoByIDHandle);
router.post("/", autenticacaoMiddleware, createProdutoHandle);
router.put("/:id", autenticacaoMiddleware, updateProdutoHandle);
router.delete("/:id", autenticacaoMiddleware, deleteProdutoHandle);

export default router;