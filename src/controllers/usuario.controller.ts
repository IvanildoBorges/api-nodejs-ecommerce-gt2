import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import UserModel from "../models/usuario.model";
import { hashearSenha } from "../utils/criptografaSenha";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";
import { validarUsuario } from "../utils/validateUser";

const getUsuarioByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o usuário existe
        const usuario: UserModel | null = await UserModel.findByPk(
            id,
            { attributes: ["id", "firstname", "surname", "email"] }
        );
        if (!usuario) return gerarRespostaDeErro(res, 404, "Usuário não encontrado!");

        return res.status(200).json({ sucesso: true, dados: usuario });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao buscar o usuário: ${error.message}`);
    }
};

const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios: UserModel[] = await UserModel.findAll({
            attributes: ["id", "firstname", "surname", "email"]
        });
        if (!usuarios) return gerarRespostaDeErro(res, 400, "Nenhum usuário cadastrado!");

        return res.status(200).json({ sucesso: true, dados: usuarios });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao buscar usuários: ${error.message}`);
    }
};

const createUsuario = async (req: Request, res: Response) => {
    try {
        const { usuario } = req.body;

        // Validando a tipagem dos dados antes de prosseguir
        if (usuario.password !== usuario.confirmPassword) return gerarRespostaDeErro(res, 400, "As senhas não coincidem!");
        validarUsuario(usuario);

        const passwordHash: string = await hashearSenha(usuario.password);
        const novoUsuario = {
            firstname: usuario.firstname,
            surname: usuario.surname,
            email: usuario.email,
            password: passwordHash
        }

        await UserModel.create(novoUsuario);
        return res.status(201).json({ sucesso: true, dados: "Usuário cadastrado com sucesso!" });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao cadastrar usuário: ${error.message}`);
    }
};

const updateUsuario = async (req: Request, res: Response) => {
    try {
        const { usuario } = req.body;
        const { id } = req.params;

        const usuarioAtualizado = await UserModel.update(usuario, { where: { id } });
        if (!usuarioAtualizado) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para atualização");

        return res.status(200).json({ sucesso: true, dados: "Usuário atualizado com sucesso!" });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao atualizar o usuário: ${error.message}`);
    }
};

const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // exclui o usuario e verifica exclusão
        const usuarioDeletado = await UserModel.destroy({ where: { id } });
        if (!usuarioDeletado) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para exclusão!");

        return res.json({ sucesso: true, dados: "Usuário deletado com sucesso!" });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao excluir o usuário: ${error.message}`);
    }
};

export const getUsuarioByIDHandle = asyncHandler(getUsuarioByID);
export const getUsuariosHandle = asyncHandler(getUsuarios);
export const createUsuarioHandle = asyncHandler(createUsuario);
export const updateUsuarioHandle = asyncHandler(updateUsuario);
export const deleteUsuarioHandle = asyncHandler(deleteUsuario);