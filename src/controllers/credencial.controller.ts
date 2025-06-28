import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import UserModel from "../models/usuario.model";
import { criarUsuario, getUsuarioPorEmail } from "../services/usuario.service";
import { UsuarioDTO } from "../types/user.types";
import { verificarSenha } from "../utils/criptografaSenha";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";
import { gerarToken } from "../utils/jwt";
import { validarCredencial } from "../utils/validateCredentials";
import { validarUsuario } from "../utils/validateUser";

// Criar conta
const registrar = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { usuario } = req.body;

        // Validando os dados antes de prosseguir
        validarUsuario(usuario);

        // Verifica se já existe usuário com o mesmo email
        const usuarioExistente: UserModel | null = await getUsuarioPorEmail(usuario.email);
        if (usuarioExistente) return gerarRespostaDeErro(res, 409, "Falha no cadastro! E-mail já cadastrado!");

        // Cria novo usuário
        const usuarioCriado: UsuarioDTO = await criarUsuario(usuario);

        return res.status(201).json({ sucesso: true, dados: { usuarioCriado } });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao criar credencial: ${error.message}`);
    }
};

// Entrar na conta
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validando os dados antes de prosseguir
        validarCredencial({ email, password });

        // Verifica se existe usuário com este email
        const usuario: UserModel | null = await getUsuarioPorEmail(email);
        if (!usuario) return gerarRespostaDeErro(res, 404, "Falha no login! E-mail não cadastrado!");

        // extrair os atributos do modelo UserModel
        const usuarioData = usuario.get({ plain: true });

        /// Verifica se a senha está correta
        const senhaValida = await verificarSenha(password, usuarioData.password);
        if (!senhaValida) return gerarRespostaDeErro(res, 401, "Falha no login! Senha inválida!");

        // Gera e retorna o token
        const token: string = gerarToken(usuario);

        // desestrutura o usuarioData somente com atributos necessários
        const { id, firstname, surname } = usuarioData;

        return res.status(200).json({
            sucesso: true,
            data: {
                token,
                usuario: { id, firstname, surname, email: usuarioData.email }
            }
        });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao realizar login: ${error.message}`);
    }
};

export const registrarHandler = asyncHandler(registrar);
export const loginHandler = asyncHandler(login);