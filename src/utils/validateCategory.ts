import CategorieModel from "../models/categoria.model";
import categoriaSchema from "../schemas/categoria.schema";

// Função para validar os dados de um usuário com o esquema UsuarioSchema
export const validarCategoria = (categoria: CategorieModel): void => {
    const resultado = categoriaSchema.safeParse(categoria);
    if (!resultado.success) {
        throw new Error(
            `Erro de validação da categoria: ${resultado.error.errors.map((x) => x.message).join(", ")}`
        );
    }
};