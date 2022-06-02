import { Router } from 'express';

import { Context } from '../controllers/MainProductController';
import BuildProduct from '../controllers/product';
import BuilReFillProduct from '../controllers/reFillProduct';
import BuildStock from '../controllers/stockController';
import { isAdmin } from '../middlewares/hasPermission';
import { updateFiles } from '../middlewares/updateFiles';

function buildProductRoute(route: Router) {
  // route.get('/product/all', (req, res) => new BuildProduct(req, res).madeFindAllProducts());
  // route.get('/product/findbyid/:id', (req, res) => new BuildProduct(req, res).madeFindOneProductById());
  // route.post('/product/modify/:id', isAdmin, (req, res) => new BuildProduct(req, res).madeChangesOnProduct());
  route.post('/product/add', isAdmin, async (req, res) => {
    const context = new Context(new BuildProduct(req.body));
    context.requestCreate();
    // const stock = new BuildStock();
    //product.setNextHandler(stock);
    // stock.setNextHandler(refill);
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
