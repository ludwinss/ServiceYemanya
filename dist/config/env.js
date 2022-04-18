"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const NODE_ENV = process.env.NODE_ENV || 'development';
const configEnv = dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
if (configEnv.error) {
    throw new Error(configEnv.error.message);
}
exports.default = configEnv;
//# sourceMappingURL=env.js.map