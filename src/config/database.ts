import { Sequelize } from "sequelize";
import { env } from "./env";

const connection = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        dialect: 'postgres',
        port: Number(env.DB_PORT),
        pool: {
            max: 10,       // número máximo de conexões simultâneas
            min: 0,        // número mínimo
            acquire: 30000, // tempo máximo (ms) para tentar adquirir conexão antes de falhar
            idle: 10000     // tempo (ms) que uma conexão pode ficar ociosa antes de ser liberada
        }
    }
);

export default connection;