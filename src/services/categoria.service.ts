import CategorieModel from "../models/categoria.model";
import { CategoriaFiltroParams } from "../types/category.types";
import { validarCategoria } from "../utils/validateCategory";

export const getTodasCategorias = async ({
    limit,
    page,
    fields,
    use_in_menu,
}: CategoriaFiltroParams) => {
    const condicao: any = {};
    let categorias;

    if (use_in_menu !== undefined) condicao.use_in_menu = use_in_menu;

    // Quais campos retornar
    const attributes = fields ? fields.split(",") : undefined;

    if (limit === -1) {
        // Busca sem paginação
        categorias = await CategorieModel.findAll({
            where: condicao,
            attributes,
        });
    } else {
        // Busca paginada
        categorias = await CategorieModel.findAll({
            where: condicao,
            attributes,
            limit,
            offset: (page - 1) * limit,
        });
    }

    // Contar o total sempre (para frontend paginar)
    const total = await CategorieModel.count({ where: condicao });

    return { data: categorias, total, limit, page };
};

export const getCategoriaPorName = async (nome: string) => {
    const categoria = await CategorieModel.findOne({
        where: { "name": nome.toLowerCase() },
        attributes: ["name", "slug", "use_in_menu"]
    });

    return categoria;
};

export const getCategoriaPorId = async (id: string) => {
    return await CategorieModel.findByPk(id, {
        attributes: ["id", "name", "slug", "use_in_menu"],
    });
};

export const criarCategoria = async (categoria: any) => {
    validarCategoria(categoria);

    const novaCategoria = await CategorieModel.create({
        name: categoria.name,
        slug: categoria.slug,
        use_in_menu: categoria.use_in_menu
    });

    const categoriaData = novaCategoria.get({ plain: true });

    const { id, name, slug, use_in_menu } = categoriaData;
    return { id, name, slug, use_in_menu };
};

export const atualizarCategoria = async (id: string, dadosAtualizados: any) => {
    return await CategorieModel.update(dadosAtualizados, { where: { id } });
};

export const excluirCategoria = async (id: string) => {
    return await CategorieModel.destroy({ where: { id } });
};
