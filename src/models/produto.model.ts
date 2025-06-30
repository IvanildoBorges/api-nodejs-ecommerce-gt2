import {
    BelongsToManySetAssociationsMixin,
    CreationOptional,
    DataTypes,
    Model,
    NonAttribute
} from 'sequelize';
import connection from '../config/database';
import CategorieModel from './categoria.model';
import CategoryProductModel from './categoriaProduto.model';
import ProductImageModel from './imagemProduto.model';
import ProductOptionModel from './opcoesProduto.model';

class ProductModel extends Model {
    declare id: CreationOptional<number>;
    declare enabled: boolean;
    declare name: string;
    declare slug: string;
    declare use_in_menu: boolean;
    declare stock: number;
    declare description: string | null;
    declare price: number;
    declare price_with_discount: number;

    // Associações que o Sequelize adiciona após o include
    declare product_images?: NonAttribute<ProductImageModel[]>;
    declare product_options?: NonAttribute<ProductOptionModel[]>;
    declare categories?: NonAttribute<CategorieModel[]>;

    // Mixin de associação belongsToMany (para setCategories funcionar)
    declare setCategories: BelongsToManySetAssociationsMixin<CategorieModel, number>;

    static associate() {
        // Relacionamento N:N
        // Relacionamento muitos-para-muitos entre Produtos e Categorias
        ProductModel.belongsToMany(CategorieModel, {
            through: CategoryProductModel, //modelo intermediário
            foreignKey: 'product_id',
            otherKey: 'category_id',
            as: 'categories',
        });

        // Relacionamento 1:N
        // Produto tem muitas imagens e imagem pertencem a um produto
        ProductModel.hasMany(ProductImageModel, {
            foreignKey: 'product_id',
            as: 'product_images',
        });
        ProductModel.hasMany(ProductOptionModel, {
            foreignKey: 'product_id',
            as: 'product_options',
        });
    }
}

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