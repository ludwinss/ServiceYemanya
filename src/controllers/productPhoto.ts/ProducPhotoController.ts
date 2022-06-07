import { Request } from 'express';

import { EVENT } from '../../constants/response-events.constants';
import { IProductPhoto } from '../../interfaces/IProductPhoto';
import { ProductPhoto } from '../../models';
import ParseBody from '../../utils/ParseBody';
import BuildController from '../Controller';

class ProductPhotoController extends BuildController {
  private _productPhoto: IProductPhoto;
  private _parseProductPhoto: ParseBody<IProductPhoto>;
  private _req: Request;

  constructor(req: Request) {
    super();
    this._req = req;
    this._productPhoto = this.resetProductPhoto();
    this._parseProductPhoto = new ParseBody<IProductPhoto>(req.body, this._productPhoto);
  }

  async getPhotoByProduct() {
    try {
      const id = this._req.params.id;
      const response = await ProductPhoto.findAndCountAll({
        where: {
          id_product: id
        }
      });
      if (!response) {
        return this.controller.run({}, EVENT.NULL);
      }
      return this.controller.run(response, EVENT.OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT.ERROR);
    }
  }

  async createPhotoByProduct() {
    try {
      this._productPhoto.id_product = BigInt(this._req.params.id);
      const files = this._req.files as Express.Multer.File[];
      const promisesProductPhoto: Promise<IProductPhoto>[] = [];
      for (const file of files) {
        this._productPhoto.legend = file.fieldname;
        this._productPhoto.image = file.buffer;
        promisesProductPhoto.push(ProductPhoto.create(this._productPhoto));
      }
      const response = await Promise.all(promisesProductPhoto);
      if (!response) {
        return this.controller.run(response, EVENT.NULL);
      }
      return this.controller.run(response, EVENT.OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT.ERROR);
    }
  }
  async deletePhotoByID() {
    try {
      const id = this._req.params.id;
      const response = await ProductPhoto.destroy({ where: { id: id } });
      if (!response) {
        return this.controller.run({}, EVENT.NULL);
      }
      return this.controller.run({ id: response }, EVENT.OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT.ERROR);
    }
  }
  private resetProductPhoto(): IProductPhoto {
    return {
      id_product: BigInt(0),
      image: null,
      legend: String()
    };
  }
}

export default ProductPhotoController;
