import { CreationOptional, DataTypes, Model } from 'sequelize';
import connection from '../config/database';
import ProductModel from './produto.model';

class ProductImageModel extends Model {
    declare id: CreationOptional<number>;
    declare enabled: boolean;
    declare path: string;

    static associate() {
        // Relacionamento 1:N
        // Produto tem muitas imagens e imagem pertencem a um produto
        ProductImageModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
    }
}

ProductImageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: ProductModel,
                key: 'id'
            }
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: connection,
        tableName: 'product_images',
        timestamps: false,
    }
);

export default ProductImageModel;
