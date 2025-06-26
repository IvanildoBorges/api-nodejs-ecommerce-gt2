import connection from "./database";

// models
import "../models/usuario.model";

// Arrow function para sincronizar os modelos com o banco de dados
const syncDatabase = async () => {
    try {
        await connection.sync({ alter: true, logging: false });
        console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
        console.error("❌ Falha na conexão com o banco de dados: ", error);
    }
};

export default syncDatabase;