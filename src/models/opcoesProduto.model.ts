import { DataTypes, Model } from 'sequelize';
import connection from '../config/database';
import ProductModel from './produto.model';

class ProductOptionModel extends Model {
    static associate() {
        // Relacionamento 1:N
        // Produto tem muitas opções e opção pertencem a um produto
        ProductOptionModel.belongsTo(ProductModel, { foreignKey: 'product_id', });
    }
}

ProductOptionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        shape: {
            type: DataTypes.ENUM('square', 'circle'),
            allowNull: true,
            defaultValue: 'square',
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        type: {
            type: DataTypes.ENUM('text', 'color'),
            allowNull: true,
            defaultValue: 'text',
        },
        values: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: connection,
        tableName: 'product_option',
        timestamps: false,
    }
);

export default ProductOptionModel;
