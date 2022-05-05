import { Router } from 'express';
import { productImageHandle } from '../middlewares/uploadsImages';

import controller from '../controllers/productPhoto.controller';

const productPhotoRoute = Router();

productPhotoRoute.get('/product-photo/:id', controller.getPhotoByProduct);
productPhotoRoute.post('/product-photo/add', productImageHandle, controller.createPhotoByProduct);

export default productPhotoRoute;
