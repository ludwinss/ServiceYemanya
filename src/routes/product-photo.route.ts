import { Router } from 'express';
import multer from 'multer';

import controller from '../controllers/product-photo.controller';

const productPhotoRoute = Router();
const multerf = multer();

productPhotoRoute.get('/product/image/:id', controller.getPhotoByProduct);
productPhotoRoute.post('/product/image/add', multerf.any(), controller.createPhotoByProduct);
productPhotoRoute.post('/product/image/delete', controller.deletePhotoByID);

export default productPhotoRoute;
