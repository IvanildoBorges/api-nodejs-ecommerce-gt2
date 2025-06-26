import UserModel from "../models/usuario.model";
import usuarioSchema from "../schemas/usuario.schema";

// Função para validar os dados de um usuário com o esquema UsuarioSchema
export const validarUsuario = (usuario: UserModel): void => {
    const resultado = usuarioSchema.safeParse(usuario);
    if (!resultado.success) {
        throw new Error(
            `Erro de validação do usuário: ${resultado.error.errors.map((x) => x.message).join(", ")}`
        );
    }
};