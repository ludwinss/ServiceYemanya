"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnection_1 = __importDefault(require("models/DBConnection"));
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING(600),
        allowNull: true
    },
}, {
    sequelize: DBConnection_1.default.getInstance(),
    tableName: 'product'
});
exports.default = Product;
//# sourceMappingURL=Product.js.map