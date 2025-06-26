import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import helmet from 'helmet';
import syncDatabase from './config/syncDatabase';
import { errorHandler } from "./middlewares/errorHandler.middleware";
import logsMorgan from "./middlewares/logs.middleware";
import rateLimiter from './middlewares/rateLimiter.middleware';
import sanitizeMiddleware from './middlewares/sanitize.middleware';
import routes from './routes/index.routes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configuração de logs
app.use(logsMorgan());

// Middleware globais
app.use(express.json({ limit: '10kb' }));           // Suporta JSON e limita tamanho das requisições
app.use(express.urlencoded({ extended: true }));    // Suporte a form-urlencoded
app.use(sanitizeMiddleware);                        // contra injeções de script (XSS)
app.use(helmet());                                  // Protege contra ataques comuns via cabeçalhos
app.use(rateLimiter);                               // Limita requisições para prevenir ataques DoS
app.use(                                            // Configuração de CORS
    cors({
        origin: ['https://ecommercegt2.com.br', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type'],
        credentials: false
    })
);
syncDatabase(); // inicia o banco de dados

// Rotas
app.use("/", routes);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;