import { EVENT_ERROR } from '../../constants/Event.constants';
import { EVENT_CREATE } from '../../constants/response-events.constants';
import { IProduct } from '../../interfaces/IProduct';
import { Product } from '../../models';

class ProductController {
  private _product: IProduct;

  constructor(product: IProduct) {
    this._product = product;
  }

  // async getById() {
  //   try {
  //     const id = this.parseProduct.parseID();
  //     const response = await Product.findByPk(id);
  //     if (!response) {
  //       return this.controller.run({}, EVENT_NULL);
  //     }
  //     return this.controller.run(response, EVENT_OK);
  //   } catch (e) {
  //     return this.controller.run(e as object, EVENT_ERROR);
  //   }
  // }

  // async modifyProductById() {
  //   try {
  //     const modifyFields = this.parseProduct.parseBodyUnStrict();
  //     const id = this.parseProduct.parseID();
  //     const oldProduct = await Product.findOne({
  //       where: { id: id },
  //       attributes: { exclude: ['create_at', 'update_at'] }
  //     });
  //     if (!oldProduct) {
  //       return this.controller.run({}, EVENT_NULL);
  //     }
  //     await oldProduct.update(modifyFields);
  //     return this.controller.run(oldProduct, EVENT_OK);
  //   } catch (e) {
  //     return this.controller.run(e as object, EVENT_ERROR);
  //   }
  // }
  // async getAll() {
  //   try {
  //     const response = await Product.findAll();
  //     if (!response) {
  //       return this.controller.run({}, EVENT_NULL);
  //     }
  //     return this.controller.run(response, EVENT_OK);
  //   } catch (e) {
  //     return this.controller.run(e as object, EVENT_ERROR);
  //   }
  // }
  addProductWithoutPhoto() {
    return Product.create(this._product)
      .then((product) => {
        if (!product) throw null;
        return { event: EVENT_CREATE, res: product };
      })
      .catch((error) => ({ event: EVENT_ERROR, res: error as object }));
  }
}

export default ProductController;
