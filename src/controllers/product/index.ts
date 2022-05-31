import { Request } from 'express';

import { EVENT_CREATE, EVENT_ERROR } from '../../constants/response-events.constants';
import { IProduct } from '../../interfaces/IProduct';
import ParseBody from '../../utils/ParseBody';
import { State } from '../MainProductController';
import BuildReFillProduct from '../reFillProduct';
import ProductController from './ProductController';

class BuildProduct extends State {
  private responseDB: { event: string; res: string | object };
  private _req: Request;

  constructor(req: Request) {
    super();
    this._req = req;
  }

  private async madeNewProductWithoutPhoto() {
    try {
      const pbProduct = new ParseBody<IProduct>(this._req, this._resetProduct());
      const response = await ProductController.addProductWithoutPhoto(pbProduct.parseBody());
      if (typeof response === 'string') throw response;
      this.responseDB = { event: EVENT_CREATE, res: response };
    } catch (error) {
      this.responseDB = { event: EVENT_ERROR, res: String(error) as string };
    }
  }

  public async create(): Promise<void> {
    await this.madeNewProductWithoutPhoto();
    console.log(this.responseDB);

    if (this.responseDB.event === EVENT_CREATE && typeof this.responseDB.res === 'object') {
      const reqSuper = Object.assign(this._req, this.responseDB.res);
      console.log(reqSuper);
      // this.context.transitionTo(new BuilReFillProduct(this.responseDB.res))
    }
  }

  // public madeFindAllProducts() {
  //   try {
  //     const findAll = new ProductController();
  //     findAll.setController(this);
  //     findAll.getAll();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  // public adeFindOneProductById() {
  //   try {
  //     const findById = new ProductController(this._req);
  //     findById.setController(this);
  //     findById.getById();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  // private madeChangesOnProduct() {
  //   try {
  //     const madeChanges = new ProductController(this._req);
  //     madeChanges.setController(this);
  //     madeChanges.modifyProductById();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  private _resetProduct(): IProduct {
    return {
      name: String(),
      description: null,
      category: null,
      type: null
    };
  }
}
export default BuildProduct;
