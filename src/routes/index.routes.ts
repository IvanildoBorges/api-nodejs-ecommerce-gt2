import { Router } from "express";
import categoryRoutes from "./categoria.routes";
import credencialRoutes from "./crendencial.routes";
import homeRoutes from "./home.routes";
import usersRoutes from "./usuario.routes";

const router = Router();

router.use("/", homeRoutes);                // Rota de boas vindas
router.use("/auth", credencialRoutes);      // gera tokens e autoriza usuário
router.use("/users", usersRoutes);          // Rotas usuário
router.use("/category", categoryRoutes);    // Rotas categoria

export default router;