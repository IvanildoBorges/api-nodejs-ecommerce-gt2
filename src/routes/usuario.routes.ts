import { Router } from "express";
import {
    createUsuarioHandle,
    deleteUsuarioHandle,
    getUsuarioByIDHandle,
    getUsuariosHandle,
    updateUsuarioHandle
} from "../controllers/usuario.controller";

const router = Router();

// CRUD
router.get("/", getUsuariosHandle);                     // busca todos
router.get("/:id", getUsuarioByIDHandle);               // busca pelo ID
router.post("/", createUsuarioHandle);                  // cria novo usuário
router.put("/:id", updateUsuarioHandle);                // atualiza usuário existente
router.delete("/:id", deleteUsuarioHandle);             // deletar um usuário

export default router;