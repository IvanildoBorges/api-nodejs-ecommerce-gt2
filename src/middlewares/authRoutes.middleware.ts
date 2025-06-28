import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/usuario.model";
import { getUsuarioPorId } from "../services/usuario.service";
import { UsuarioDTO } from "../types/user.types";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";
import { verificarToken } from "../utils/jwt";
import { asyncHandler } from "./capturaErrosParaExpressCorrigir.middleware";

export interface AuthRequest extends Request {
    user?: UsuarioDTO;
}

const autenticar = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Obtém e verifica se existe o token
        const tokenBearer: string | undefined = req.headers.authorization;
        if (!tokenBearer || !tokenBearer.startsWith('Bearer ')) {
            return gerarRespostaDeErro(res, 401, "Acesso negado! Token não fornecido.");
        }
        const token: string = tokenBearer.split(' ')[1]; // Extrai o token após "Bearer"

        // decodifica e verifica se o token é válido
        const decoded: JwtPayload = verificarToken(token);

        if (!decoded || !decoded.dataValues.id) {
            return gerarRespostaDeErro(res, 401, "Token inválido ou expirado!");
        }

        // verifica se o usuário existe
        const usuario: UserModel | null = await getUsuarioPorId(decoded.dataValues.id);
        if (!usuario) {
            return gerarRespostaDeErro(res, 404, "Usuário não encontrado!");
        }

        // extrair os atributos do modelo UserModel
        const usuarioData = usuario.get({ plain: true });

        // desestrutura o usuarioData somente com atributos necessários
        const { id, firstname, surname, email } = usuarioData;

        // Adiciona o usuário decodificado à requisição para uso posterior
        req.user = { id, firstname, surname, email };

        next(); // Prossegue para o próximo middleware ou controlador
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao verificar o token: ${error.message}`);
    }
};

export const autenticacaoMiddleware = asyncHandler(autenticar);