import { z } from "zod";

// Validação para credenciais de usuário
const credencialSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .regex(/\d/, "A senha deve conter pelo menos um número")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/[!@$!&_]/, "A senha deve conter pelo menos um caractere especial: !@$&_"),
});

export default credencialSchema;