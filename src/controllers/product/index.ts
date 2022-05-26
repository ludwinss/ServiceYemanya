import { EVENT_ERROR } from '../../constants/Event.constants';
import { EVENT_CREATE } from '../../constants/response-events.constants';
import { IProduct } from '../../interfaces/IProduct';
import ParseBody from '../../utils/ParseBody';
import ProductHandler from '../MainProductController';
import ProductController from './ProductController';

class BuildProduct extends ProductHandler {
  public start<T>(req: T) {
    this.handle({ event: 'CREATE', res: req });
  }

  private async madeNewProductWithoutPhoto<T>(res: T) {
    try {
      const pbProduct = new ParseBody<IProduct>(res, this._resetProduct());
      return await new ProductController(pbProduct.parseBody()).addProductWithoutPhoto();
    } catch (error) {
      console.error(error);
    }
  }

  public async handle(request: any) {
    try {
      const { event, res } = request;
      if (event === EVENT_ERROR || request === undefined) throw null;

      switch (event) {
        case EVENT_CREATE:
          return super.handle(await this.madeNewProductWithoutPhoto(res));
        default:
          return super.handle(undefined);
      }
    } catch (error) {
      console.log(error);
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
