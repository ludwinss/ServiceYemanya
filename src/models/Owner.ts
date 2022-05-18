import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Op } from 'sequelize';

import DBConnection from './DBConnection';
import User from './User';

class Owner extends Model<InferAttributes<Owner>, InferCreationAttributes<Owner>> {
  declare id: CreationOptional<bigint>;
  declare name: string;
  declare last_name: string | null;
  declare nickname: string | null;
  declare phone: string;
  declare login: string;
  declare pwd: string;
  declare dni: string | null;
  declare email: string | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Owner.init(
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
    dni: DataTypes.STRING(63),
    email: { type: DataTypes.STRING(63), unique: true },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'owner',
    hooks: {
      beforeCreate: async (record, options) => {
        record.created_at = new Date();
        record.updated_at = new Date();

        const findUser = await User.findOne({
          where: {
            [Op.or]: [{ login: record.login }, { phone: record.phone }, { email: record.email }, { dni: record.dni }]
          }
        });
        if (findUser) return Promise.reject('Error: Fields Duplicates');
      },
      beforeUpdate: (record, options) => {
        record.updated_at = new Date();
      }
    }
  }
);

export default Owner;
