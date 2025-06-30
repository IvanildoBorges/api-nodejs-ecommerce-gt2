import { Op } from "sequelize";
import CategorieModel from "../models/categoria.model";
import ProductImageModel from "../models/imagemProduto.model";
import ProductOptionModel from "../models/opcoesProduto.model";
import ProductModel from "../models/produto.model";
import {
    ProdutoFiltroParams,
    ProdutoTypes,
    ResultadoListaProdutos,
    UpdateProdutoTypes
} from "../types/product.types";
import { validarProduto } from "../utils/validateProduct";

export const getTodosProdutos = async ({
    limit,
    page,
    fields,
    match,
    category_ids,
    price_range,
    options
}: ProdutoFiltroParams): Promise<ResultadoListaProdutos> => {
    const condicao: any = {};
    const include: any[] = [
        {
            model: ProductImageModel,
            as: 'product_images',
            attributes: ['id', 'path'],
        },
        {
            model: ProductOptionModel,
            as: 'product_options',
        },
        {
            model: CategorieModel,
            as: 'categories',
            attributes: ['id'],
            through: { attributes: [] },
        },
    ];

    // match por nome ou descrição
    if (match) {
        condicao[Op.or] = [
            { name: { [Op.like]: `%${match}%` } },
            { description: { [Op.like]: `%${match}%` } },
        ];
    }

    // faixa de preço
    if (price_range) {
        condicao.price = { [Op.between]: price_range };
    }

    // categorias
    if (category_ids) {
        include[2].where = { id: { [Op.in]: category_ids } };
    }

    // opções (como filtro avançado)
    if (options && Object.keys(options).length > 0) {
        // Para cada option_id, faremos um include com condição de valores
        for (const optionId in options) {
            const valores = options[optionId];

            include.push({
                model: ProductOptionModel,
                as: 'product_options',
                where: {
                    id: Number(optionId),
                    values: {
                        [Op.or]: valores.map((val) => ({
                            [Op.like]: `%${val}%`, // busca por valores contidos
                        })),
                    },
                },
            });
        }
    }

    const attributes = fields ? fields.split(",") : undefined;

    const queryOptions: any = {
        where: condicao,
        include,
        attributes,
        distinct: true,
        order: [['id', 'ASC']],
    };

    const total = await ProductModel.count({
        where: condicao,
        distinct: true,
        col: 'id',
        include: category_ids ? [{
            model: CategorieModel,
            as: 'categories',
            where: { id: { [Op.in]: category_ids } },
        }] : undefined,
    });

    if (limit !== -1) {
        queryOptions.limit = limit;
        queryOptions.offset = (page - 1) * limit;
    }

    const data = await ProductModel.findAll(queryOptions);

    const resultado = data.map((produto) => ({
        id: produto.id,
        enabled: produto.enabled,
        name: produto.name,
        slug: produto.slug,
        stock: produto.stock,
        description: produto.description,
        price: produto.price,
        price_with_discount: produto.price_with_discount,
        category_ids: produto.categories?.map(c => c.id) || [],
        images: produto.product_images?.map(img => ({
            id: img.id,
            content: img.path
        })) || [],
        options: produto.product_options || [],
    }));

    return {
        data: resultado,
        total,
        limit,
        page
    };
};

export const getProdutoPorId = async (id: string): Promise<ProductModel | null> => {
    return await ProductModel.findByPk(id, {
        include: [
            {
                model: ProductImageModel,
                as: 'product_images',
                attributes: ['id', 'path'],
            },
            {
                model: ProductOptionModel,
                as: 'product_options'
            },
            {
                model: CategorieModel,
                as: 'categories',
                attributes: ['id'],
                through: { attributes: [] }, // remove dados extras da tabela intermediária
            },
        ],
    });
};

export const criarProduto = async (produto: ProdutoTypes): Promise<ProductModel> => {
    validarProduto(produto);

    const categorias = await CategorieModel.findAll({
        where: { id: produto.category_ids },
    });

    if (categorias.length !== produto.category_ids.length) {
        throw new Error("Uma ou mais categorias fornecidas não existem!");
    }

    const produtoCriado: ProductModel = await ProductModel.create(
        {
            ...produto,
            categories: categorias, // Associar categorias (N:N)
            product_images: produto.images.map((img) => ({
                type: img.type,
                path: img.content,
            })),
            product_options: produto.options,
        },
        {
            include: [
                { model: ProductImageModel, as: 'product_images' },
                { model: ProductOptionModel, as: 'product_options' }
            ]
        }
    );

    await produtoCriado.setCategories(produto.category_ids);


    return produtoCriado;
};

export const atualizarProduto = async (id: string, dadosAtualizados: UpdateProdutoTypes): Promise<void> => {
    const produto = await ProductModel.findByPk(id);
    if (!produto) throw new Error("Produto não encontrado");

    // Atualizar dados básicos do produto
    await produto.update(dadosAtualizados);

    // Atualizar categorias (N:N)
    if (dadosAtualizados.category_ids) {
        const categorias = await CategorieModel.findAll({
            where: { id: dadosAtualizados.category_ids },
        });
        await produto.setCategories(categorias);
    }

    // Atualizar imagens (1:N)
    if (dadosAtualizados.images) {
        for (const img of dadosAtualizados.images) {
            if (img.deleted && img.id) {
                await ProductImageModel.destroy({ where: { id: img.id, product_id: id } });
            } else if (img.id) {
                await ProductImageModel.update(
                    { path: img.content },
                    { where: { id: img.id, product_id: id } }
                );
            } else {
                await ProductImageModel.create({
                    product_id: Number(id),
                    type: img.type,
                    path: img.content,
                });
            }
        }
    }

    // Atualizar opções (1:N)
    if (dadosAtualizados.options) {
        for (const opt of dadosAtualizados.options) {
            if (opt.deleted && opt.id) {
                await ProductOptionModel.destroy({ where: { id: opt.id, product_id: id } });
            } else if (opt.id) {
                await ProductOptionModel.update(opt, { where: { id: opt.id, product_id: id } });
            } else {
                await ProductOptionModel.create({ ...opt, product_id: Number(id) });
            }
        }
    }
};

export const excluirProduto = async (id: string) => {
    const produto = await ProductModel.findByPk(id);
    if (!produto) throw new Error("Produto não encontrado");

    await ProductModel.destroy({ where: { id } });
};
