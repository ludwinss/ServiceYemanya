import { Request, Response } from 'express';

import ProductHandler from '../MainProductController';
import ProductController from './ProductController';

class BuildProduct extends ProductHandler {
  private _res: Response;
  private _req: Request;
  constructor(req: Request, res: Response) {
    super();
    this._req = req;
    this._res = res;
  }
  public runaa() {
    this.handle({ event: 'CREATE' });
    console.log(super.getState());
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
  private madeNewProductWithoutPhoto() {
    try {
      const addNewProduct = new ProductController(this._req);
      addNewProduct.addProductWithoutPhoto();
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  // private madeChangesOnProduct() {
  //   try {
  //     const madeChanges = new ProductController(this._req);
  //     madeChanges.setController(this);
  //     madeChanges.modifyProductById();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  async handleEvent(event: string) {
    switch (event) {
      case 'CREATE':
        return await this.madeNewProductWithoutPhoto();
      default:
        return {};
    }
  }

  public async handle(request: any) {
    const { event } = request;
    const data = await this.handleEvent(event);

    return super.handle({ event: 'CREATE', data });
  }
}
export default BuildProduct;
