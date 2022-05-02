import { Router } from "express";
import controller from "../controllers/productPhoto.controller";

const productPhotoRoute = Router();

productPhotoRoute.get('/product-photo/:id', controller.getPhotoByProduct);
productPhotoRoute.post('/product-photo/add', controller.createPhotoByProduct);

export default productPhotoRoute;