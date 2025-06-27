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

// Relacionamento muitos-para-muitos entre Produtos e Categorias
ProductModel.belongsToMany(CategorieModel, {
    through: CategoryProductModel,
    foreignKey: 'product_id',
    otherKey: 'category_id',
});
CategorieModel.belongsToMany(ProductModel, {
    through: CategoryProductModel,
    foreignKey: 'category_id',
    otherKey: 'product_id',
});

export default CategoryProductModel;
