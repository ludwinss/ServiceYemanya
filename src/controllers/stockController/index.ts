import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IStock } from '../../interfaces/IStock';
import { IController } from '../Controller';
import StockController from './StockController';

class BuildStock implements IController {
  private readonly _stock: IStock;
  constructor(stock: IStock) {
    this._stock = stock;
  }
  addNewStock() {
    try {
      const newStock = new StockController(this._stock);
      newStock.setController(this);
      newStock.createStock();
    } catch (error) {
      return this.run(error as object, EVENT_ERROR);
    }
  }
  run(send: object, event: string) {
    switch (event) {
      case EVENT_OK:
        break;
      case EVENT_NULL:
        break;
      case EVENT_ERROR:
        break;
    }
  }
}
