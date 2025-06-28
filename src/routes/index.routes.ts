import { Router } from "express";
import credencialRoutes from "./crendencial.routes";
import homeRoutes from "./home.routes";
import usersRoutes from "./usuario.routes";

const router = Router();

router.use("/", homeRoutes); // Rota de boas vindas
router.use("/auth", credencialRoutes);
router.use("/users", usersRoutes);

export default router;