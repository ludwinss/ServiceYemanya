import { Transaction } from 'sequelize/types';

import { EVENT } from '../../constants/response-events.constants';
import { IProduct } from '../../interfaces/IProduct';
import ParseBody from '../../utils/ParseBody';
import { IEvent } from '../Controller';
import ProductController from './ProductController';

class BuildProduct {
  #pbProduct: ParseBody<IProduct>;
  constructor(params: Partial<IProduct>) {
    this.#pbProduct = new ParseBody(params, this._resetProduct());
  }
  public async create(transaction: Transaction): IEvent<IProduct> {
    try {
      const response = await ProductController.addProductWithoutPhoto(this.#pbProduct.parseBody(), transaction);
      if (typeof response === 'string') throw response;
      return { event: EVENT.OK, res: response };
    } catch (error) {
      return { event: EVENT.ERROR, res: String(error) };
    }
  }

  public static async madeFindAllProducts() {
    try {
      const findAll = await ProductController.getAll();
      if (typeof findAll === 'string') throw findAll;
      return { event: EVENT.OK, res: findAll };
    } catch (error) {
      return { event: EVENT.ERROR, res: String(error) };
    }
  }
  public static async madeFindOneProductById(id: number) {
    try {
      const findOneProduct = await ProductController.getById(id);
      if (typeof findOneProduct === 'string') throw findOneProduct;
      return { event: EVENT.OK, res: findOneProduct };
    } catch (error) {
      return { event: EVENT.ERROR, res: String(error) };
    }
  }
  public async madeChangesOnProduct(id: number) {
    try {
      const changeProduct = await ProductController.modifyProductById(this.#pbProduct.parseBodyUnStrict(), id);
      if (typeof changeProduct === 'string') throw changeProduct;
      return { event: EVENT.OK, res: changeProduct };
    } catch (error) {
      return { event: EVENT.ERROR, res: String(error) };
    }
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
