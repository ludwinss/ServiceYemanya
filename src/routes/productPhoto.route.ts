import { Router } from 'express';

import controller from '../controllers/productPhoto.controller';
import { productImageHandle } from '../middlewares/uploadsImages';

const productPhotoRoute = Router();

productPhotoRoute.get('/product-photo/:id', controller.getPhotoByProduct);
productPhotoRoute.post('/product-photo/add', productImageHandle, controller.createPhotoByProduct);

export default productPhotoRoute;
