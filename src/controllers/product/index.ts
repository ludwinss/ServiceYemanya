import { EVENT } from '../../constants/response-events.constants';
import { IProduct } from '../../interfaces/IProduct';
import ParseBody from '../../utils/ParseBody';
import { State } from '../MainProductController';
import BuildReFillProduct from '../reFillProduct';
import ProductController from './ProductController';

class BuildProduct extends State {
  public async create(): Promise<void> {
    try {
      const pbProduct = new ParseBody<IProduct>(this.context.params, this._resetProduct());
      if (!this.context.transaction) throw null;
      const response = await ProductController.addProductWithoutPhoto(pbProduct.parseBody(), this.context.transaction);
      if (typeof response === 'string') throw response;
      this.context.params = Object.assign(this.context.params, response);
      if ('id' in response) {
        this.context.params['id_product'] = response['id'];
      }
      this.context.transitionTo(await new BuildReFillProduct());
      this.context.requestCreate();
    } catch (error) {
      this.context.params = error;
      this.context.sendResponse(error === 'null' ? EVENT.NULL : EVENT.ERROR);
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

  public findByID(): void {
    this.context.params = 'not implement';
    this.context.sendResponse(EVENT.ERROR);
  }
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
