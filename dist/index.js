"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(9092, () => {
    console.log("server cargado csm");
    console.log('soy muy gozu gaa');
});
//# sourceMappingURL=index.js.map