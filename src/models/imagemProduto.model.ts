import { DataTypes, Model } from 'sequelize';
import connection from '../config/database';
import ProductModel from './produto.model';

class ProductImage extends Model { }

ProductImage.init(
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

// Produto tem muitas imagens
ProductModel.hasMany(ProductImage, {
    foreignKey: 'product_id', // Chave estrangeira que será usada na tabela ProductImage
});

// E imagem pertencem a um produto
ProductImage.belongsTo(ProductModel, {
    foreignKey: 'product_id',  // Referência ao campo ID do ProductModel
});

export default ProductImage;
