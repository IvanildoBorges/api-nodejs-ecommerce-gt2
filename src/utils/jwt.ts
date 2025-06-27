import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import UserModel from '../models/usuario.model';

export const gerarToken = (payload: UserModel): string => {
    return jwt.sign(
        {
            ...payload,
            iat: Math.floor(Date.now() / 1000),
            permissions: ['read', 'write']
        },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRATION }
    );
};

export const verificarToken = (token: string): jwt.JwtPayload => {
    try {
        const tokenE: Object = jwt.verify(token, env.JWT_SECRET);
        return tokenE;
    } catch {
        return {};
    }
};

export const renovaToken = (token: string, decoded: jwt.JwtPayload, payload: UserModel) => {
    // Renova se faltam menos de 5 minutos
    if (decoded && decoded.exp && Date.now() / 1000 > decoded.exp - 300) {
        return gerarToken(payload);
    } else {
        return token; // senão, retorna token ainda válido
    }
}