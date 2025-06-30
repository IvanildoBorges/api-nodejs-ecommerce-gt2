import { SignOptions } from "jsonwebtoken";
import { z } from "zod";

// Obtendo o tipo correto do expiresIn
type ExpiresInType = SignOptions["expiresIn"];

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
    DB_PORT: z.string().regex(/^\d+$/).default("5433"),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    SERVER_PORT: z.string().regex(/^\d+$/).default("3000"),
    JWT_SECRET: z.string().min(32, "JWT_SECRET deve ter pelo menos 32 caracteres"),
    JWT_EXPIRATION: z.custom<ExpiresInType>(), // Agora tem exatamente os tipos aceitos
    SALT_ROUNDS: z.string().regex(/^\d+$/, "O salto deve ser um número válido").transform(Number)
        .refine((val) => val >= 10, "O salto deve ser igual ou maior que 10"),
});

export default envSchema;