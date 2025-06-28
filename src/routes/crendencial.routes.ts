import { Router } from "express";
import {
    loginHandler,
    registrarHandler,
} from "../controllers/credencial.controller";

const router = Router();

router.post("/login", loginHandler);         // entra com credencial
router.post("/register", registrarHandler);  // cria credencial

export default router;