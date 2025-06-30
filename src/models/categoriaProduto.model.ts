import { DataTypes, Model } from 'sequelize';
import connection from '../config/database';
import CategorieModel from './categoria.model';
import ProductModel from './produto.model';

class CategoryProductModel extends Model { }

CategoryProductModel.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CategorieModel,
                key: 'id'
            }
        }
    },
    {
        sequelize: connection,
        tableName: 'categories_products',
        timestamps: false,
    }
);

export default CategoryProductModel;
