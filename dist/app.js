"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/env");
const routes_1 = require("./routes");
//DotEnv Config 
const app = (0, express_1.default)();
app.use("/api", routes_1.productRoute);
exports.default = app;
//# sourceMappingURL=app.js.map