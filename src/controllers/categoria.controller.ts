import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import CategorieModel from "../models/categoria.model";
import { atualizarCategoria, criarCategoria, excluirCategoria, getCategoriaPorId, getCategoriaPorName, getTodasCategorias } from "../services/categoria.service";
import { CategoriaFiltroParams } from "../types/category.types";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";

const getCategoriaByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoria = await getCategoriaPorId(id);
        if (!categoria) return gerarRespostaDeErro(res, 404, "Categoria não encontrada!")
        return res.status(200).json({ sucesso: true, dados: categoria });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao buscar categoria: ${error.message}`);
    }
};

const getCategorias = async (req: Request, res: Response) => {
    try {
        const { limit = "12", page = "1", fields, use_in_menu } = req.query;

        const filtros: CategoriaFiltroParams = {
            limit: parseInt(limit as string),
            page: parseInt(page as string),
            fields: fields as string | undefined,
        };

        // Só adiciona se realmente existir
        if (use_in_menu !== undefined) filtros.use_in_menu = use_in_menu === "true";

        const resultado = await getTodasCategorias(filtros);

        return res.status(200).json({ sucesso: true, dados: resultado });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao buscar categorias: ${error.message}`);
    }
};

const createCategoria = async (req: Request, res: Response) => {
    try {
        const { categoria } = req.body;
        const categoriaExistente: CategorieModel | null = await getCategoriaPorName(categoria.name);
        if (categoriaExistente) return gerarRespostaDeErro(res, 409, "Falha ao criar categoria! Categoria já cadastrada!");

        const categoriaCriada = await criarCategoria(categoria);
        return res.status(201).json({ sucesso: true, dados: categoriaCriada });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao criar categoria: ${error.message}`);
    }
};

const updateCategoria = async (req: Request, res: Response) => {
    try {
        const { categoria } = req.body;
        const { id } = req.params;

        if (!categoria) return gerarRespostaDeErro(res, 400, "Dados incorretos para atualizar categoria!");

        const resultado = await atualizarCategoria(id, categoria);
        if (!resultado[0]) return gerarRespostaDeErro(res, 404, "Categoria não encontrada para atualização");
        return res.status(204).send({});
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao atualizar categoria: ${error.message}`);
    }
};

const deleteCategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const resultado = await excluirCategoria(id);
        if (!resultado) return gerarRespostaDeErro(res, 404, "Usuário não encontrado para exclusão!");
        return res.status(204).json({});
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Erro ao excluir categoria: ${error.message}`);
    }
};

export const getCategoriaByIDHandle = asyncHandler(getCategoriaByID);
export const getCategoriasHandle = asyncHandler(getCategorias);
export const createCategoriaHandle = asyncHandler(createCategoria);
export const updateCategoriaHandle = asyncHandler(updateCategoria);
export const deleteCategoriaHandle = asyncHandler(deleteCategoria);
