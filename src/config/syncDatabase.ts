import connection from "./database";

// executa todas as associações e modelos
import CategorieModel from "../models/categoria.model";
import '../models/categoriaProduto.model';
import ProductImageModel from "../models/imagemProduto.model";
import ProductOptionModel from "../models/opcoesProduto.model";
import ProductModel from "../models/produto.model";
import '../models/usuario.model';

ProductModel.associate();
CategorieModel.associate();
ProductImageModel.associate();
ProductOptionModel.associate();

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