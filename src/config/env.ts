import dotenv from "dotenv";
import envSchema from "../schemas/env.schema";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    throw new Error(
        `⚠️ Erro nas variáveis de ambiente: ${parsedEnv.error.format()}`
    );
}

export const env = parsedEnv.data;