import { DataTypes, Model } from 'sequelize';
import connection from '../config/database';

class ProductModel extends Model { }

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        sequelize: connection,
        tableName: 'product',
        timestamps: true,
    }
);

export default ProductModel;