import { Response } from "express";

// Função auxiliar para respostas padronizadas de erro
export const gerarRespostaDeErro = (res: Response, status: number, message: string) => {
    return res.status(status).json({ sucesso: false, message });
};