import { IProduct } from '../../interfaces/IProduct';
import ParseBody from '../../utils/ParseBody';
import ProductHandler from '../MainProductController';
import ProductController from './ProductController';

class BuildProduct extends ProductHandler {
  public runaa(data: any) {
    this.handle({ event: 'CREATE', data });
  }
  private madeNewProductWithoutPhoto(
    newProduct: IProduct
  ): { event: 'ERROR'; data: string } | { event: 'CREATE'; data: any } {
    try {
      const response = new ProductController(newProduct).addProductWithoutPhoto();
      if (typeof response === 'string') throw response;
      return { data: response, event: 'CREATE' };
    } catch (error) {
      return { event: 'ERROR', data: String(error) };
    }
  }

  public async handle(request: any) {
    // try {

    //   const { event } = data;
    //   switch (event) {
    //     case 'CREATE':
    //       c await this.madeNewProductWithoutPhoto(new ParseBody<IProduct>(data.data, this._resetProduct()).parseBody());
    //     default:
    //       return {};
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    return super.handle({ event: 'CREATE', data: {} });
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
