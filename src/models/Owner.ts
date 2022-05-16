import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import DBConnection from './DBConnection';

class Owner extends Model<InferAttributes<Owner>, InferCreationAttributes<Owner>> {
  declare id: CreationOptional<bigint>;
  declare fullname: string;
  // declare last_name: string;
  declare nickname: string | null;
  declare phone: string;
  declare login: string;
  declare pwd: string;
  // declare dni: string | null;
  declare email: string | null;
  declare created_at: Date;
  declare updated_at: Date;
}

Owner.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: { type: DataTypes.STRING, allowNull: false },
    // last_name: { type: DataTypes.STRING, allowNull: false },
    nickname: DataTypes.STRING(63),
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    login: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    pwd: { type: DataTypes.STRING(63, true), allowNull: false },
    // dni: DataTypes.STRING(63),
    email: DataTypes.STRING(63),
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false }
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'owner'
  }
);

export default Owner;
