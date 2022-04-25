import { Router } from "express";
import controller from "controllers/product.controller";

const productRoute = Router();

productRoute.get('/product', controller.getAll);

export default productRoute;