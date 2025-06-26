import { Router } from "express";

const router = Router();

// Rota de boas vindas
router.use("/", (req, res) => {
    res.send('Hello World! Welcome to Ecommerce GT2 API!')
});

export default router;