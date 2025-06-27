import { DataTypes, Model } from 'sequelize';
import connection from '../config/database';

class CategorieModel extends Model { }

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
