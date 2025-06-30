import app from "./app";
import { env } from "./config/env";

app.listen(
    env.SERVER_PORT,
    () => console.log(`🚀 Servidor rodando: http://localhost:${env.SERVER_PORT}/v1`)
)
