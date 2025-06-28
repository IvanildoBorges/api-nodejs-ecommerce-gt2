import UserModel from "../models/usuario.model";
import { UsuarioDTO } from "../types/user.types";
import { hashearSenha } from "../utils/criptografaSenha";
import { validarUsuario } from "../utils/validateUser";

export const getTodosUsuarios = async () => {
    return await UserModel.findAll({
        attributes: ["id", "firstname", "surname", "email"],
    });
};

export const getUsuarioPorId = async (id: string) => {
    return await UserModel.findByPk(id, {
        attributes: ["id", "firstname", "surname", "email"],
    });
};

export const getUsuarioPorEmail = async (email: string) => {
    return await UserModel.findOne({
        where: { email },
    });
};

export const criarUsuario = async (usuario: any): Promise<UsuarioDTO> => {
    if (usuario.password !== usuario.confirmPassword) {
        throw new Error("As senhas não coincidem!");
    }

    validarUsuario(usuario);

    const senhaHash = await hashearSenha(usuario.password);

    const novoUsuario = await UserModel.create({
        firstname: usuario.firstname,
        surname: usuario.surname,
        email: usuario.email,
        password: senhaHash,
    });

    // extrair os atributos do modelo UserModel
    const usuarioData = novoUsuario.get({ plain: true });

    // Retorna apenas dados públicos (sem senha)
    const { id, firstname, surname, email } = usuarioData;
    console.log({ id, firstname, surname, email });
    return { id, firstname, surname, email };
};

export const atualizarUsuario = async (id: string, dadosAtualizados: any) => {
    if (dadosAtualizados.password) {
        dadosAtualizados.password = await hashearSenha(dadosAtualizados.password);
    }

    return await UserModel.update(dadosAtualizados, { where: { id } });
};

export const excluirUsuario = async (id: string) => {
    return await UserModel.destroy({ where: { id } });
};
