import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import ProductModel from "../models/produto.model";
import {
    atualizarProduto,
    criarProduto,
    excluirProduto,
    getProdutoPorId,
    getTodosProdutos
} from "../services/produto.service";
import { ProdutoFiltroParams, ResultadoListaProdutos } from "../types/product.types";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";

const getProdutoByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const produto: ProductModel | null = await getProdutoPorId(id);
        if (!produto) return gerarRespostaDeErro(res, 404, "Produto não encontrado!")

        const response = {
            id: produto.id,
            enabled: produto.enabled,
            name: produto.name,
            slug: produto.slug,
            stock: produto.stock,
            description: produto.description,
            price: produto.price,
            price_with_discount: produto.price_with_discount,
            category_ids: produto.categories?.map(categoria => categoria.id) || [],
            images: produto.product_images?.map(img => ({
                id: img.id,
                content: img.path,
            })) || [],
            options: produto.product_options || [],
        };

        return res.status(200).json({ sucesso: true, dados: response });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 400, `Erro ao buscar o produto: ${error.message}`);
    }
};

const getProdutos = async (req: Request, res: Response) => {
    try {
        const {
            limit = "12",
            page = "1",
            fields,
            match,
            category_ids,
            "price-range": priceRange,
            ...rawOptions
        } = req.query;

        const filtros: ProdutoFiltroParams = {
            limit: parseInt(limit as string),
            page: parseInt(page as string),
        };

        if (fields) filtros.fields = fields as string;
        if (match) filtros.match = match as string;

        if (category_ids) {
            filtros.category_ids = (category_ids as string)
                .split(",")
                .map((id) => parseInt(id.trim()))
                .filter((id) => !isNaN(id));
        }

        if (priceRange) {
            const [min, max] = (priceRange as string).split("-").map(Number);
            if (!isNaN(min) && !isNaN(max)) filtros.price_range = [min, max];
        }


        const optionFiltro: Record<number, string[]> = {};
        for (const key in rawOptions) {
            const match = key.match(/^option\[(\d+)\]$/);
            if (match) {
                const optionId = parseInt(match[1]);
                const values = (rawOptions[key] as string).split(",").map(v => v.trim());
                optionFiltro[optionId] = values;
            }
        }
        if (Object.keys(optionFiltro).length > 0) filtros.options = optionFiltro;

        const resultado: ResultadoListaProdutos = await getTodosProdutos(filtros);
        return res.status(200).json({ sucesso: true, dados: resultado });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 400, `Erro ao buscar produtos: ${error.message}`);
    }
};

const createProduto = async (req: Request, res: Response) => {
    try {
        const produto = req.body;

        const novoProduto = await criarProduto(produto);
        return res.status(201).json({ sucesso: true, dados: novoProduto });
    } catch (error: any) {
        return gerarRespostaDeErro(res, 400, `Erro ao criar produto: ${error.message}`);
    }
};

const updateProduto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        await atualizarProduto(id, dadosAtualizados);
        return res.status(204).send();
    } catch (error: any) {
        if (error.message === "Produto não encontrado")
            return gerarRespostaDeErro(res, 404, error.message);
        return gerarRespostaDeErro(res, 400, `Erro ao atualizar produto: ${error.message}`);
    }
};

const deleteProduto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await excluirProduto(id);
        return res.status(204).send();
    } catch (error: any) {
        if (error.message === "Produto não encontrado") return gerarRespostaDeErro(res, 404, error.message);
        return gerarRespostaDeErro(res, 400, `Erro ao excluir produto: ${error.message}`);
    }
};

export const getProdutoByIDHandle = asyncHandler(getProdutoByID);
export const getProdutosHandle = asyncHandler(getProdutos);
export const createProdutoHandle = asyncHandler(createProduto);
export const updateProdutoHandle = asyncHandler(updateProduto);
export const deleteProdutoHandle = asyncHandler(deleteProduto);
