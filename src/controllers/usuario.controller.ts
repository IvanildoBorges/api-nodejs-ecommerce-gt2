import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import {
    atualizarUsuario,
    criarUsuario,
    excluirUsuario,
    getTodosUsuarios,
    getUsuarioPorId,
} from "../services/usuario.service";
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
    await criarUsuario(usuario);
    return res.status(201).json({ sucesso: true, dados: "Usuário cadastrado com sucesso!" });
};

const updateUsuario = async (req: Request, res: Response) => {
    const { usuario } = req.body;
    const { id } = req.params;
    const resultado = await atualizarUsuario(id, usuario);
    if (!resultado[0]) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para atualização");
    return res.status(200).json({ sucesso: true, dados: "Usuário atualizado com sucesso!" });
};

const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resultado = await excluirUsuario(id);
    if (!resultado) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para exclusão!");
    return res.status(200).json({ sucesso: true, dados: "Usuário deletado com sucesso!" });
};

export const getUsuarioByIDHandle = asyncHandler(getUsuarioByID);
export const getUsuariosHandle = asyncHandler(getUsuarios);
export const createUsuarioHandle = asyncHandler(createUsuario);
export const updateUsuarioHandle = asyncHandler(updateUsuario);
export const deleteUsuarioHandle = asyncHandler(deleteUsuario);
