import { Request, Response } from 'express';

import { EVENT } from '../constants/response-events.constants';
import { DBConnection } from '../models';
import HttpResponse from '../utils/HttpResponse';
import BuildProduct from './product';
import BuildReFillProduct from './reFillProduct';
import BuildStock from './stockController';

class MainProductController {
  #request: Request;
  #response: Response;
  constructor(req: Request, res: Response) {
    this.#request = req;
    this.#response = res;
  }
  public async create() {
    const transaction = await DBConnection.getInstance().transaction();
    try {
      const newProduct = await new BuildProduct(this.#request.body).create(transaction);

      if (newProduct.event !== EVENT.OK) throw newProduct;
      this.renameKey(newProduct.res, 'id', 'id_product');

      const newReFill = await new BuildReFillProduct(Object.assign(this.#request.body, newProduct.res)).create(
        transaction
      );
      if (newReFill.event !== EVENT.OK) throw newReFill;
      this.renameKey(newReFill.res, 'amount', 'total');

      const newStock = await new BuildStock(Object.assign(this.#request.body, newProduct.res, newReFill.res)).create(
        transaction
      );
      if (newStock.event !== EVENT.OK) throw newStock;

      transaction.commit();
      return this.#response.status(200).send(HttpResponse.ok(newStock.res));
    } catch (error: any) {
      transaction.rollback();
      if ('res' in error)
        return this.#response
          .status(400)
          .send(error.res === 'null' ? HttpResponse.fail() : HttpResponse.mistake(error.res));
      return this.#response.status(500).send(HttpResponse.mistake(error));
    }
  }
  public async modifyProduct() {
    try {
      const modify = await new BuildProduct(this.#request.body).madeChangesOnProduct(parseInt(this.#request.params.id));
      if (modify.event !== EVENT.OK) throw modify;

      return this.#response.status(200).send(HttpResponse.ok(modify.res));
    } catch (error: any) {
      if ('res' in error)
        return this.#response
          .status(400)
          .send(error.res === 'null' ? HttpResponse.fail() : HttpResponse.mistake(error.res));

      return this.#response.status(500).send(error);
    }
  }
  public async findStockByIDProduct() {
    try {
      const findProduct = await BuildProduct.madeFindOneProductById(parseInt(this.#request.params.id));
      if (findProduct.event !== EVENT.OK) throw findProduct;

      return this.#response.status(200).send(HttpResponse.ok(findProduct.res));
    } catch (error: any) {
      if ('res' in error)
        return this.#response
          .status(400)
          .send(error.res === 'null' ? HttpResponse.fail() : HttpResponse.mistake(error.res));

      return this.#response.status(500).send(error);
    }
  }
  public async findAllProduct() {
    try {
      const foundStock = await BuildProduct.madeFindAllProducts();
      console.log(foundStock);
      if (foundStock.event !== EVENT.OK) throw foundStock;
      return this.#response.status(200).send(HttpResponse.ok(foundStock.res));
    } catch (error: any) {
      if ('res' in error)
        return this.#response
          .status(400)
          .send(error.res === 'null' ? HttpResponse.fail() : HttpResponse.mistake(error.res));
      return this.#response.status(500).send(HttpResponse.mistake(error));
    }
  }

  private renameKey(obj: any, oldKey: string, newKey: string) {
    if (oldKey in obj) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }
}

export default MainProductController;
