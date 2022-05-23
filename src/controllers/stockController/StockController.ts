import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IStock } from '../../interfaces/IStock';
import { Stock } from '../../models';
import BuildController from '../Controller';

class StockController extends BuildController {
  private _stock: IStock;
  constructor(stock: IStock) {
    super();
    this._stock = stock;
  }
  createStock() {
    try {
      const newStock = Stock.create(this._stock, { raw: true });
      if (!newStock) this.controller.run({}, EVENT_NULL);
      return this.controller.run(newStock, EVENT_OK);
    } catch (error) {
      return this.controller.run(error as object, EVENT_ERROR);
    }
  }
  async incrementStock(idStock: number) {
    try {
      const foundStock = await Stock.findByPk(idStock);
      if (!foundStock) return this.controller.run({}, EVENT_NULL);
      foundStock.increment('total', { by: this._stock.total });
      foundStock.reload();
      return this.controller.run(foundStock, EVENT_OK);
    } catch (error) {
      return this.controller.run(error as object, EVENT_ERROR);
    }
  }
  async decrementStock(idStock: number) {
    try {
      const foundStock = await Stock.findByPk(idStock);
      if (!foundStock) return this.controller.run({}, EVENT_NULL);
      foundStock.decrement('total', { by: this._stock.total });
      foundStock.reload();
      return this.controller.run(foundStock, EVENT_OK);
    } catch (error) {
      return this.controller.run(error as object, EVENT_ERROR);
    }
  }
  async changePrice(idStock: number) {
    try {
      const foundStock = await Stock.findByPk(idStock);
      if (!foundStock) return this.controller.run({}, EVENT_NULL);
      foundStock.price = this._stock.price;
      foundStock.save();
      return this.controller.run(foundStock, EVENT_OK);
    } catch (error) {
      return this.controller.run(error as object, EVENT_ERROR);
    }
  }
}

export default StockController;
