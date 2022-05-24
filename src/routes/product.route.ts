import { Router } from 'express';

import BuildProduct from '../controllers/product';
import BuilReFillProduct from '../controllers/reFillProduct';
import BuildStock from '../controllers/stockController';
import { isAdmin } from '../middlewares/hasPermission';
import { updateFiles } from '../middlewares/updateFiles';

function buildProductRoute(route: Router) {
  // route.get('/product/all', (req, res) => new BuildProduct(req, res).madeFindAllProducts());
  // route.get('/product/findbyid/:id', (req, res) => new BuildProduct(req, res).madeFindOneProductById());
  // route.post('/product/modify/:id', isAdmin, (req, res) => new BuildProduct(req, res).madeChangesOnProduct());
  route.post('/product/add', isAdmin, (req, res) => {
    const product = new BuildProduct(req, res);
    const stock = new BuildStock({ id_product: 1 as any, price: 33, total: 1 });
    const refill = new BuilReFillProduct({ amount: 1, id_owner: 1 as any, id_product: 1 as any });
    product.setNextHandler(stock);
    stock.setNextHandler(refill);
    product.runaa();
    refill.getState();
  });
}

function buildProductPhotoRoute(route: Router) {
  console.log('');
  // route.get('/product/image/:id', (req, res) => new BuildProduct(req, res).madeGetProductImageByID());
  // route.post('/product/image/add/:id', isAdmin, updateFiles().any(), (req, res) =>
  //   new BuildProduct(req, res).madeNewProductImageByIdProduct()
  // );
  // route.post('/product/image/delete/:id', isAdmin, (req, res) => new BuildProduct(req, res).madeDeleteProductImage());
}

export { buildProductPhotoRoute, buildProductRoute };
