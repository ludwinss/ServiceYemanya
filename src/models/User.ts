import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Op
} from 'sequelize';

import DBConnection from './DBConnection';
import MakeSell from './MakeSell';
import Owner from './Owner';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<bigint>;
  declare name: string;
  declare phone: string;
  declare login: string;
  declare pwd: string;
  declare last_name: string | null;
  declare nickname: string | null;
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
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    login: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    pwd: { type: DataTypes.STRING(63, true), allowNull: false },
    dni: { type: DataTypes.STRING(63), unique: true },
    email: { type: DataTypes.STRING(63), unique: true },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    address: DataTypes.STRING
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'user',
    hooks: {
      beforeCreate: async (record, options) => {
        record.created_at = new Date();
        record.updated_at = new Date();
        const findFields = await Owner.findOne({
          where: { [Op.or]: [{ login: record.login }, { phone: record.phone }, { email: record.email }] }
        });
        if (findFields) return Promise.reject('Error: Fields Duplicates');
      },
      beforeUpdate: (record, options) => {
        record.updated_at = new Date();
      }
    }
  }
);

export default User;
