import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/usuario.model";
import { getUsuarioPorId } from "../services/usuario.service";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";
import { renovaToken, verificarToken } from "../utils/jwt";
import { asyncHandler } from "./capturaErrosParaExpressCorrigir.middleware";

const autenticar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtém e verifica se existe o token
        const tokenBearer: string | undefined = req.headers.authorization;
        if (!tokenBearer || !tokenBearer.startsWith('Bearer ')) {
            return gerarRespostaDeErro(res, 401, "Acesso negado! Token não fornecido.");
        }
        const token: string = tokenBearer.split(' ')[1]; // Extrai o token após "Bearer"

        // decodifica e verifica se o token é válido
        const decoded: JwtPayload = verificarToken(token);
        if (!decoded || !decoded.id) {
            return gerarRespostaDeErro(res, 401, "Token inválido ou expirado!");
        }

        // verifica se o usuário existe
        const usuario: UserModel | null = await getUsuarioPorId(decoded.id);
        if (!usuario) {
            return gerarRespostaDeErro(res, 404, "Usuário não encontrado!");
        }

        // Renova o token se estiver prestes a expirar, senão retorna o token ainda válido
        const novoToken = renovaToken(token, decoded, usuario);

        // Retorna o novo token como "Bearer"
        res.status(200).json({ sucesso: true, data: { token: novoToken, } });

        next(); // Prossegue para o próximo middleware ou controlador
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao verificar o token: ${error.message}`);
    }
};

export const autenticacaoMiddleware = asyncHandler(autenticar);