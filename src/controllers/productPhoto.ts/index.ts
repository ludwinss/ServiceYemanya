import { Request, Response } from 'express';

import { EVENT } from '../../constants/response-events.constants';
import HttpResponse from '../../utils/HttpResponse';
import { IController } from '../Controller';
import ProductPhotoController from '../productPhoto.ts/ProducPhotoController';

class BuildProductPhoto implements IController {
  private _res: Response;
  private _req: Request;
  constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
  }

  madeDeleteProductImage() {
    try {
      const madeDelete = new ProductPhotoController(this._req);
      madeDelete.setController(this);
      madeDelete.deletePhotoByID();
    } catch (error) {
      this.run(error as object, EVENT.ERROR);
    }
  }
  madeGetProductImageByID() {
    try {
      const madeGetProduct = new ProductPhotoController(this._req);
      madeGetProduct.setController(this);
      madeGetProduct.getPhotoByProduct();
    } catch (error) {
      this.run(error as object, EVENT.ERROR);
    }
  }
  madeNewProductImageByIdProduct() {
    try {
      const newImageProduct = new ProductPhotoController(this._req);
      newImageProduct.setController(this);
      newImageProduct.createPhotoByProduct();
    } catch (error) {
      this.run(error as object, EVENT.ERROR);
    }
  }

  run(send: object, event: string) {
    switch (event) {
      case EVENT.OK:
        this._res.status(201).send(HttpResponse.ok(send));
        break;
      case EVENT.ERROR:
        this._res.status(400).send(HttpResponse.mistake(String(send)));
        break;
      case EVENT.NULL:
        this._res.status(500).send(HttpResponse.fail());
        break;
    }
  }
}
export default BuildProductPhoto;
