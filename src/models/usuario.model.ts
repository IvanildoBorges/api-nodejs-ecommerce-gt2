import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/database";
import { UsuarioCompleto } from "../types/user.types";

// Para criação, o ID pode ser opcional
interface UserCreationAttributes extends Optional<UsuarioCompleto, "id"> { }

class UserModel extends Model<UsuarioCompleto, UserCreationAttributes> implements UsuarioCompleto {
    declare id: number;
    declare firstname: string;
    declare surname: string;
    declare email: string;
    declare password: string;

    // timestamps automáticos (se usados)
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        tableName: "user",
        timestamps: true,
    }
);

export default UserModel;