import credencialSchema from "../schemas/credencial.schema";
import { Credencial } from "../types/credencial.types";

// Função para validar os dados de uma credencial com o esquema CredencialSchema
export const validarCredencial = (credencial: Credencial): void => {
    const resultado = credencialSchema.safeParse(credencial);
    if (!resultado.success) {
        throw new Error(
            `Erro de validação da credencial: ${resultado.error.errors.map((x) => x.message).join(", ")}`
        );
    }
};