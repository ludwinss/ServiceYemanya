import { Request, Response } from 'express';

import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import HttpResponse from '../../utils/HttpResponse';
import { IController } from '../Controller';
import ProductPhotoController from './ProducPhotoController';
import ProductController from './ProductController';

class BuildProduct implements IController {
  private _res: Response;
  private _req: Request;
  constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
  }

  madeFindAllProducts() {
    try {
      const findAll = new ProductController();
      findAll.setController(this);
      findAll.getAll();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }
  madeFindOneProductById() {
    try {
      const findById = new ProductController(this._req);
      findById.setController(this);
      findById.getById();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }
  madeNewProductWithoutPhoto() {
    try {
      const addNewProduct = new ProductController(this._req);
      addNewProduct.setController(this);
      addNewProduct.addProductWithoutPhoto();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }
  madeChangesOnProduct() {
    try {
      const madeChanges = new ProductController(this._req);
      madeChanges.setController(this);
      madeChanges.modifyProductById();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }

  // PRODUCT IMAGE CONTROLLS
  madeDeleteProductImage() {
    try {
      const madeDelete = new ProductPhotoController(this._req);
      madeDelete.setController(this);
      madeDelete.deletePhotoByID();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }
  madeGetProductImageByID() {
    try {
      const madeGetProduct = new ProductPhotoController(this._req);
      madeGetProduct.setController(this);
      madeGetProduct.getPhotoByProduct();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }
  madeNewProductImageByIdProduct() {
    try {
      const newImageProduct = new ProductPhotoController(this._req);
      newImageProduct.setController(this);
      newImageProduct.createPhotoByProduct();
    } catch (error) {
      this.run(error as object, EVENT_ERROR);
    }
  }

  run(send: object, event: string) {
    switch (event) {
      case EVENT_OK:
        this._res.status(201).send(HttpResponse.ok(send));
        break;
      case EVENT_ERROR:
        this._res.status(400).send(HttpResponse.mistake(String(send)));
        break;
      case EVENT_NULL:
        this._res.status(500).send(HttpResponse.fail());
        break;
    }
  }
}
export default BuildProduct;
