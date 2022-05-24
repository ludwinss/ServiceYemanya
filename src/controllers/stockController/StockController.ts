import { IStock } from '../../interfaces/IStock';
import { Stock } from '../../models';

class StockController {
  private _stock: IStock;
  constructor(stock: IStock) {
    this._stock = stock;
  }
  public async createStock(): Promise<Stock | string> {
    try {
      const newStock = await Stock.create(this._stock, { raw: true });
      if (!newStock) throw null;
      return newStock;
    } catch (error) {
      return String(error);
    }
  }
  // async incrementStock(idStock: number) {
  //   try {
  //     const foundStock = await Stock.findByPk(idStock);
  //     if (!foundStock) throw null;
  //     foundStock.increment('total', { by: this._stock.total });
  //     foundStock.reload();
  //     return foundStock;
  //   } catch (error) {
  //     return error as object;
  //   }
  // }
  // async decrementStock(idStock: number) {
  //   try {
  //     const foundStock = await Stock.findByPk(idStock);
  //     if (!foundStock) throw null;
  //     foundStock.decrement('total', { by: this._stock.total });
  //     foundStock.reload();
  //     return foundStock;
  //   } catch (error) {
  //     return error as object;
  //   }
  // }
  // async changePrice(idStock: number) {
  //   try {
  //     const foundStock = await Stock.findByPk(idStock);
  //     if (!foundStock) throw null;
  //     foundStock.price = this._stock.price;
  //     foundStock.save();
  //     return foundStock;
  //   } catch (error) {
  //     return error as object
  //   }
  // }
}

export default StockController;
