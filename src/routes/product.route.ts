import { Router } from "express";
import controller from "../controllers/product.controller";

const productRoute = Router();

productRoute.get('/product', controller.getAll);
productRoute.get('/product/:id', controller.getById);
productRoute.post('/product/add', controller.addProductWithoutPhoto);

export default productRoute;