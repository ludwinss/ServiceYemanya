import { IReFill } from '../../interfaces/IReFill';
import ProductHandler from '../MainProductController';
import ReFillController from './ReFillController';

class BuilReFillProduct extends ProductHandler {
  private readonly _refillProduct;
  constructor(refillProduct: IReFill) {
    super();
    this._refillProduct = refillProduct;
  }
  private async addRegister() {
    try {
      return await new ReFillController(this._refillProduct).createReFill();
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
        return await this.addRegister();
      default:
        return {};
    }
  }
}

export default BuilReFillProduct;
