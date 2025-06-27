import { Router } from "express";
import {
    createUsuarioHandle,
    deleteUsuarioHandle,
    getUsuarioByIDHandle,
    getUsuariosHandle,
    updateUsuarioHandle
} from "../controllers/usuario.controller";
import { autenticacaoMiddleware } from "../middlewares/authRoutes.middleware";

const router = Router();

// CRUD
router.get("/", getUsuariosHandle);                                 // busca todos
router.get("/:id", getUsuarioByIDHandle);                           // busca pelo ID
router.post("/", autenticacaoMiddleware, createUsuarioHandle);      // cria novo usuário
router.put("/:id", autenticacaoMiddleware, updateUsuarioHandle);    // atualiza usuário
router.delete("/:id", autenticacaoMiddleware, deleteUsuarioHandle); // deletar um usuário

export default router;