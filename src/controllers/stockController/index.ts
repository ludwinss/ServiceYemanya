import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IStock } from '../../interfaces/IStock';
import ParseBody from '../../utils/ParseBody';
import { IController } from '../Controller';
import ProductHandler from '../MainProductController';
import StockController from './StockController';

class BuildStock extends ProductHandler {
  private readonly _stock: IStock;
  constructor(stock: IStock) {
    super();
    this._stock = stock;
  }
  private async addNewStock() {
    try {
      return await new StockController(this._stock).createStock();
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  public async handle(request: any) {
    const { event } = request;
    const data = await this.handleEvent(event);
    return super.handle({ event: 'CREATE', data });
  }
  async handleEvent(event: string) {
    switch (event) {
      case 'CREATE':
        return await this.addNewStock();
      default:
        return {};
    }
  }
}

export default BuildStock;
