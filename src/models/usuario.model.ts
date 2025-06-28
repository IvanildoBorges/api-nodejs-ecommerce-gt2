import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/database";
import { UsuarioCompleto } from "../types/user.types";

// Para criação, o ID pode ser opcional
interface UserCreationAttributes extends Optional<UsuarioCompleto, "id"> { }

class UserModel extends Model<UsuarioCompleto, UserCreationAttributes> implements UsuarioCompleto {
    public id!: number;
    public firstname!: string;
    public surname!: string;
    public email!: string;
    public password!: string;

    // timestamps automáticos (se usados)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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