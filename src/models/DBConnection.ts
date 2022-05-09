import { Sequelize } from 'sequelize';
import { Sequelize as SequelizeProps } from 'sequelize/types';

import { dbConfig } from '../config/db.config';

class DBConnection {
  protected static _instance: SequelizeProps;

  private _createInstance(): Sequelize {
    return new Sequelize(dbConfig, {
      define: {
        timestamps: true,
        underscored: true
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: {
        max: 10,
        min: 0,
        acquire: 3000,
        idle: 10000
      }
    });
  }

  static getInstance(): Sequelize {
    if (!this._instance) {
      this._instance = new DBConnection()._createInstance();
    }
    return this._instance;
  }
}

export default DBConnection;
