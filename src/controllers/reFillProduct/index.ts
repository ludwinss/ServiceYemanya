import { IReFill } from '../../interfaces/IReFill';
import ParseBody from '../../utils/ParseBody';
import ProductHandler from '../MainProductController';
import ReFillController from './ReFillController';

class BuilReFillProduct extends ProductHandler {
  private async addRegister(reFillInstance: IReFill) {
    try {
      return await new ReFillController(reFillInstance).createReFill();
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
        return await this.addRegister(new ParseBody<IReFill>(data.data, this._resetReFillProduct()).parseBody());
      default:
        return {};
    }
  }
  private _resetReFillProduct(): IReFill {
    return {
      amount: Number(),
      id_owner: Number() as any,
      id_product: Number() as any
    };
  }
}

export default BuilReFillProduct;
