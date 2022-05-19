import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IProduct } from '../../interfaces/IProduct';
import { Product } from '../../models';
import ParseBody from '../../utils/ParseBody';
import BuildController from '../Controller';

class ProductController extends BuildController {
  private _product: IProduct;
  private parseProduct: ParseBody<IProduct>;

  constructor(params?: any) {
    super();
    this._product = this._resetProduct();
    this.parseProduct = new ParseBody<IProduct>(params, this._product);
  }

  async getById() {
    try {
      const id = this.parseProduct.parseID();
      const response = await Product.findByPk(id);
      if (!response) {
        return this.controller.run({}, EVENT_NULL);
      }
      return this.controller.run(response, EVENT_OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT_ERROR);
    }
  }

  async modifyProductById() {
    try {
      const modifyFields = this.parseProduct.parseBodyUnStrict();
      const id = this.parseProduct.parseID();
      const oldProduct = await Product.findOne({
        where: { id: id },
        attributes: { exclude: ['create_at', 'update_at'] }
      });
      if (!oldProduct) {
        return this.controller.run({}, EVENT_NULL);
      }
      await oldProduct.update(modifyFields);
      return this.controller.run(oldProduct, EVENT_OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT_ERROR);
    }
  }
  async getAll() {
    try {
      const response = await Product.findAll();
      if (!response) {
        return this.controller.run({}, EVENT_NULL);
      }
      return this.controller.run(response, EVENT_OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT_ERROR);
    }
  }
  async addProductWithoutPhoto() {
    try {
      const f = this.parseProduct.parseBody();
      const response = await Product.create(this._product);
      if (!response) {
        return this.controller.run({}, EVENT_NULL);
      }
      return this.controller.run(response, EVENT_OK);
    } catch (e) {
      return this.controller.run(e as object, EVENT_ERROR);
    }
  }
  private _resetProduct(): IProduct {
    return {
      name: '',
      description: null,
      category: null,
      type: null
    };
  }
}

export default ProductController;
