import { z } from "zod";

// Validação para usuário
const categoriaSchema = z.object({
    name: z.string({ message: "Nome da categoria é obrigatório!" }),
    slug: z.string({ message: "Slug da categoria é obrigatório!" }),
    use_in_menu: z.boolean().optional(),
});

export default categoriaSchema;