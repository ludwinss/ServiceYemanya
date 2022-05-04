import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import DBConnection from '../models/DBConnection';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<bigint>;

  declare name: string;

  declare description: string | null;

  declare category: string | null;

  declare type: string | null;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(600),
      allowNull: true
    }
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'product'
  }
);

export default Product;
