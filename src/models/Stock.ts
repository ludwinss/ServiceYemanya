import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize';

import DBConnection from './DBConnection';
import Product from './Product';

class Stock extends Model<InferAttributes<Stock>, InferCreationAttributes<Stock>> {
  declare id: CreationOptional<bigint>;
  declare total: number;
  declare price: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  //foreignKeys
  declare id_product: ForeignKey<Product['id']>;
  declare product: NonAttribute<Product>;
  declare static associations: {
    product: Association<Stock, Product>;
  };
}

Stock.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'stock',
    hooks: {
      beforeCreate: (instance) => {
        instance.created_at = new Date();
        instance.updated_at = new Date();
      },
      beforeUpdate: (instance) => {
        instance.updated_at = new Date();
      }
    }
  }
);

export default Stock;
