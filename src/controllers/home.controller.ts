import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";

const saudacao = async (req: Request, res: Response) => {
    try {
        return res.send('Hello World! Welcome to Ecommerce GT2 API!');
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Não foi possível carregar a pagina inicial: ${error.message}`);
    }
};

export const homeHandle = asyncHandler(saudacao);