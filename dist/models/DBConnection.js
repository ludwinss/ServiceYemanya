"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("config/dbConfig");
const sequelize_1 = require("sequelize");
class DBConnection {
    _createInstance() {
        return new sequelize_1.Sequelize(dbConfig_1.dbConfig, {
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
    static getInstance() {
        if (!this._instance) {
            this._instance = new DBConnection()._createInstance();
        }
        return this._instance;
    }
}
exports.default = DBConnection;
//# sourceMappingURL=DBConnection.js.map