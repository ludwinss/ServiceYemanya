import { Sequelize } from 'sequelize';
import dbConfig from '../config/dbConfig';

class Connection {

    private static _instance: Sequelize;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new Sequelize(
                dbConfig.database,
                dbConfig.username,
                dbConfig.password,
                {
                    host: dbConfig.host,
                    dialect: "postgres",
                    ssl: true,
                    native: true
                });
        }
        return this._instance;
    }
}

Connection.getInstance().authenticate();
