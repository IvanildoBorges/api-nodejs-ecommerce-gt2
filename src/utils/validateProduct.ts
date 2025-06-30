import produtoSchema from "../schemas/produto.schema";
import { ProdutoTypes } from "../types/product.types";

export const validarProduto = (produto: ProdutoTypes): void => {
    const resultado = produtoSchema.safeParse(produto);
    if (!resultado.success) {
        throw new Error(
            `Erro de validação do produto: ${resultado.error.errors.map((x) => x.message).join(", ")}`
        );
    }
};