import { Transaction } from 'sequelize/types';

import { EVENT } from '../../constants/response-events.constants';
import { IStock } from '../../interfaces/IStock';
import ParseBody from '../../utils/ParseBody';
import { IEvent } from '../Controller';
import StockController from './StockController';

class BuildStock {
  #pbStock: ParseBody<IStock>;
  constructor(params: Partial<IStock>) {
    this.#pbStock = new ParseBody(params, this._resetStock());
  }
  public async create(transaction: Transaction): IEvent<IStock> {
    try {
      const responseDB = await StockController.createStock(this.#pbStock.parseBody(), transaction);
      if (typeof responseDB === 'string') throw responseDB;
      return { event: EVENT.OK, res: responseDB };
    } catch (error) {
      return { event: EVENT.ERROR, res: String(error) };
    }
  }

  //public async findByID(): Promise<void> {
  //try {
  //if (!('id_product' in this.context.params)) throw null;
  //const responseDB = await StockController.findStockByID(this.context.params['id_product']);
  //if (typeof responseDB === 'string') throw responseDB;
  //this.context.params = responseDB;
  //this.context.sendResponse(EVENT.OK);
  //} catch (error) {
  //this.context.params = error;
  //this.context.sendResponse(error == 'null' ? EVENT.NULL : EVENT.ERROR);
  //}
  //}

  private _resetStock(): IStock {
    return {
      id_product: Number() as any,
      price: Number(),
      total: Number()
    };
  }
}

export default BuildStock;
