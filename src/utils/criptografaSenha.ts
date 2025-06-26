import bcrypt from 'bcrypt';
import { env } from '../config/env';

export const hashearSenha = async (senha: string): Promise<string> => {
    return await bcrypt.hash(senha, env.SALT_ROUNDS);
};

export const verificarSenha = async (senha: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(senha, hash);
};