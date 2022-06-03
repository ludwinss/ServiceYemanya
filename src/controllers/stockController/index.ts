import { EVENT } from '../../constants/response-events.constants';
import { IStock } from '../../interfaces/IStock';
import ParseBody from '../../utils/ParseBody';
import { State } from '../MainProductController';
import StockController from './StockController';

class BuildStock extends State {
  public async create(): Promise<void> {
    try {
      const pbStock = new ParseBody<IStock>(this.context.params, this._resetStock());
      if (!this.context.transaction) throw null;
      const responseDB = await StockController.createStock(pbStock.parseBody(), this.context.transaction);
      if (typeof responseDB === 'string') throw responseDB;
      this.context.params = responseDB;
      this.context.sendResponse(EVENT.OK);
    } catch (error) {
      this.context.params = error;
      this.context.sendResponse(error === 'null' ? EVENT.NULL : EVENT.ERROR);
    }
  }

  public async findByID(): Promise<void> {
    try {
      if (!('id_product' in this.context.params)) throw null;
      const responseDB = await StockController.findStockByID(this.context.params['id_product']);
      if (typeof responseDB === 'string') throw responseDB;
      this.context.params = responseDB;
      this.context.sendResponse(EVENT.OK);
    } catch (error) {
      this.context.params = error;
      this.context.sendResponse(error == 'null' ? EVENT.NULL : EVENT.ERROR);
    }
  }

  private _resetStock(): IStock {
    return {
      id_product: Number() as any,
      price: Number(),
      total: Number()
    };
  }
}

export default BuildStock;
