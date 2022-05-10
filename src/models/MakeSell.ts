import {
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
import User from './User';

class MakeSell extends Model<InferAttributes<MakeSell>, InferCreationAttributes<MakeSell>> {
  declare id: CreationOptional<bigint>;
  declare amount: number;
  declare price: number;
  declare created_at: Date;
  declare updated_at: Date;

  //association User(N:M)MakeSell  and  User(N:M)Product
  declare id_user: ForeignKey<User['id']>;
  declare id_product: ForeignKey<Product['id']>;

  declare users: NonAttribute<User[]>;
  declare products: NonAttribute<Product[]>;
}

MakeSell.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    price: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'makesell'
  }
);

export default MakeSell;
