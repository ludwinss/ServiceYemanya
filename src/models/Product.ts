import DBConnection from "models/DBConnection";
import { CreateOptions, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>>{
    declare id: CreateOptions<number>;
    declare name: string;
    declare description: string | null;
    declare category: string | null;
    declare type: string | null;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(600),
            allowNull: true
        },
    }
    , {
        sequelize: DBConnection.getInstance(),
        tableName: 'product'
    }
)

export default Product;