import { Router } from 'express';

import MainProductController from '../controllers/MainProductController';
import BuildProductPhoto from '../controllers/productPhoto.ts';
import { isAdmin } from '../middlewares/hasPermission';
import { updateFiles } from '../middlewares/updateFiles';

function buildProductRoute(route: Router) {
  route.get('/product/all', (req, res) => new MainProductController(req, res).findAllProduct());
  route.get('/product/findbyid/:id', (req, res) => {
    new MainProductController(req, res).findStockByIDProduct();
  });
  route.post('/product/modify/:id', isAdmin, (req, res) => new MainProductController(req, res).modifyProduct());
  route.post('/product/add', isAdmin, async (req, res) => {
    new MainProductController(req, res).create();
  });
}

function buildProductPhotoRoute(route: Router) {
  route.get('/product/image/:id', (req, res) => new BuildProductPhoto(req, res).madeGetProductImageByID());
  route.post('/product/image/add/:id', isAdmin, updateFiles().any(), (req, res) =>
    new BuildProductPhoto(req, res).madeNewProductImageByIdProduct()
  );
  route.post('/product/image/delete/:id', isAdmin, (req, res) =>
    new BuildProductPhoto(req, res).madeDeleteProductImage()
  );
}

export { buildProductPhotoRoute, buildProductRoute };
