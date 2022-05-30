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
import Owner from './Owner';
import Product from './Product';

class ReFill extends Model<InferAttributes<ReFill>, InferCreationAttributes<ReFill>> {
  declare id: CreationOptional<bigint>;
  declare amount: number;
  declare created_at: CreationOptional<Date>;

  //association User(N:M)MakeSell  and  User(N:M)Product
  declare id_owner: ForeignKey<Owner['id']>;
  declare id_product: ForeignKey<Product['id']>;

  declare owners: NonAttribute<Owner[]>;
  declare products: NonAttribute<Product[]>;

  declare static associations: {
    products: Association<ReFill, Product>;
    owners: Association<ReFill, Owner>;
  };
}

ReFill.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    created_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'refill',
    hooks: {
      beforeCreate: (instance) => {
        instance.created_at = new Date();
      }
    }
  }
);

export default ReFill;
