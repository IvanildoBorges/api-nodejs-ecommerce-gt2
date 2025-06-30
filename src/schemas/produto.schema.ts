import { z } from "zod";

const produtoSchema = z.object({
    id: z.number().optional(),
    enabled: z.boolean().default(false),
    name: z.string({ message: "Nome do produto não pode ser vazio!" }),
    slug: z.string({ message: "Slug do produto não pode ser vazio!" }),
    use_in_menu: z.boolean().default(false),
    stock: z.number().default(0),
    description: z.string().optional(),
    price: z.number({ message: "Informe o preço do produto!" }),
    price_with_discount: z.number({ message: "Informe o preço com desconto do produto!" }),

    // Relacionamento com categorias (somente IDs, pois o relacionamento é N:N)
    category_ids: z.array(z.number({
        required_error: "Informe os IDs das categorias",
        invalid_type_error: "O ID da categoria deve ser numérico",
    })),

    // Relacionamento com imagens (1:N)
    images: z.array(z.object({
        type: z.string({ message: "Tipo da imagem é obrigatório" }),
        content: z.string({ message: "Conteúdo da imagem é obrigatório" }),
    })),

    // Relacionamento com opções (1:N)
    options: z.array(z.object({
        title: z.string({ message: "O título da opção é obrigatório" }),
        shape: z.enum(["square", "circle"], { required_error: "Forma inválida" }),
        radius: z.union([z.string(), z.number()]).optional(),
        type: z.enum(["text", "color"], { required_error: "Tipo inválido" }),
        values: z.string({ message: "Cada valor da opção deve ser uma string válida!" })
    }))
});

export default produtoSchema;
