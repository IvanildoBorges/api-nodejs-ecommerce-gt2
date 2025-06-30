import { CreationOptional, DataTypes, Model } from 'sequelize';
import connection from '../config/database';
import CategoryProductModel from './categoriaProduto.model';
import ProductModel from './produto.model';

class CategorieModel extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare slug: string;
    declare use_in_menu: boolean;

    static associate() {
        // Relacionamento N:N
        // Relacionamento muitos-para-muitos entre Produtos e Categorias e Produtos
        CategorieModel.belongsToMany(ProductModel, {
            through: CategoryProductModel,  //modelo intermediário
            foreignKey: 'category_id',
            otherKey: 'product_id',
            as: 'products'
        });
    }
}

CategorieModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize: connection,
        tableName: 'category',
        timestamps: true,
    }
);

export default CategorieModel;
