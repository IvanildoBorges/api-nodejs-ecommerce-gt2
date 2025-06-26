import { NextFunction, Request, Response } from "express";

// Middleware de tratamento de erros
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Erro foi: ", err);

    // Se o erro for uma instância de Error com status, utiliza o status da resposta
    if (err.status) {
        res.status(err.status).json({
            message: err.message || "Erro interno do servidor",
        });
    }

    // Se o erro não tiver status, retorna erro 500 (Erro interno do servidor)
    res.status(500).json({
        message: err.message || "Erro interno do servidor",
    });
}