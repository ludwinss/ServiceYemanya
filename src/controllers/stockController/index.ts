import { IStock } from '../../interfaces/IStock';
import ParseBody from '../../utils/ParseBody';
import ProductHandler from '../MainProductController';
import StockController from './StockController';

class BuildStock extends ProductHandler {
  private async addNewStock(newStock: IStock) {
    try {
      return await new StockController(newStock).createStock();
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  public async handle(request: any) {
    const data = await this.handleEvent(request);
    return super.handle({ event: 'CREATE', data });
  }
  async handleEvent(data: any) {
    const { event } = data;
    switch (event) {
      case 'CREATE':
        return await this.addNewStock(new ParseBody<IStock>(data.data, this._resetStock()).parseBody());
      default:
        return {};
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
