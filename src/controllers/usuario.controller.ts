import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authRoutes.middleware";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import UserModel from "../models/usuario.model";
import {
    atualizarUsuario,
    criarUsuario,
    excluirUsuario,
    getTodosUsuarios,
    getUsuarioPorEmail,
    getUsuarioPorId,
} from "../services/usuario.service";
import { UsuarioDTO } from "../types/user.types";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";

const getUsuarioByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuarioPorId(id);
    if (!usuario) return gerarRespostaDeErro(res, 404, "Usuário não encontrado!");
    return res.status(200).json({ sucesso: true, dados: usuario });
};

const getUsuarios = async (_req: Request, res: Response) => {
    const usuarios = await getTodosUsuarios();
    if (!usuarios.length) return gerarRespostaDeErro(res, 400, "Nenhum usuário cadastrado!");
    return res.status(200).json({ sucesso: true, dados: usuarios });
};

const createUsuario = async (req: Request, res: Response) => {
    const { usuario } = req.body;
    // Verifica se existe usuário com este email
    const usuarioExistente: UserModel | null = await getUsuarioPorEmail(usuario.email);
    if (usuarioExistente) return gerarRespostaDeErro(res, 409, "Falha ao criar usuário! E-mail já cadastrado!");

    const usuarioCriado: UsuarioDTO = await criarUsuario(usuario);
    return res.status(201).json({ sucesso: true, dados: usuarioCriado });
};

const updateUsuario = async (req: AuthRequest, res: Response) => {
    const { usuario } = req.body;
    const { id } = req.params;
    const userID: number | undefined = req.user?.id;

    if (Number(id) === userID) {
        const resultado = await atualizarUsuario(id, usuario);
        if (!resultado[0]) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para atualização");
        return res.status(200).json({ sucesso: true, dados: "Usuário atualizado com sucesso!" });
    } else {
        return res.status(403).json({ sucesso: false, dados: "Você não tem permissão para atualizar este usuário!" });
    }
};

const deleteUsuario = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userID: number | undefined = req.user?.id;

    if (Number(id) === userID) {
        const resultado = await excluirUsuario(id);
        if (!resultado) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para exclusão!");
        return res.status(200).json({ sucesso: true, dados: "Usuário deletado com sucesso!" });
    } else {
        return res.status(403).json({ sucesso: false, dados: "Você não tem permissão para excluir este usuário!" });
    }
};

export const getUsuarioByIDHandle = asyncHandler(getUsuarioByID);
export const getUsuariosHandle = asyncHandler(getUsuarios);
export const createUsuarioHandle = asyncHandler(createUsuario);
export const updateUsuarioHandle = asyncHandler(updateUsuario);
export const deleteUsuarioHandle = asyncHandler(deleteUsuario);
