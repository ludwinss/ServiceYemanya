import { Transaction } from 'sequelize/types';

import { IStock } from '../../interfaces/IStock';
import { Stock } from '../../models';

class StockController {
  static async createStock(stock: IStock, transaction: Transaction): Promise<IStock | string> {
    return Stock.create(stock, { transaction: transaction })
      .then((stockInstance) => {
        if (!stockInstance) throw stockInstance;
        return stockInstance.get({ plain: true });
      })
      .catch((error) => String(error));
  }
  static async findStockByID(id: number) {
    return Stock.findByPk(id)
      .then((stockInstance) => {
        if (!stockInstance) throw stockInstance;
        return stockInstance.get({ plain: true });
      })
      .catch((error) => String(error));
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
