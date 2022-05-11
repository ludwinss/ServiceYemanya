import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize';

import DBConnection from './DBConnection';
import MakeSell from './MakeSell';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<bigint>;
  declare name: string;
  declare last_name: string | null;
  declare nickname: string | null;
  declare phone: string;
  declare login: string;
  declare pwd: string;
  declare dni: string | null;
  declare email: string | null;
  declare address: string | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  //association makesell and user
  declare makeSells: NonAttribute<MakeSell[]>;
  declare static associations: {
    makeSells: Association<User, MakeSell>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    nickname: DataTypes.STRING(63),
    phone: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING(15), allowNull: false },
    pwd: { type: DataTypes.STRING(63, true), allowNull: false },
    dni: DataTypes.STRING(63),
    email: DataTypes.STRING(63),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    address: DataTypes.STRING
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'user',
    hooks: {
      beforeCreate: (record, options) => {
        record.created_at = new Date();
        record.updated_at = new Date();
      },
      beforeUpdate: (record, options) => {
        record.updated_at = new Date();
      }
    }
  }
);

export default User;
