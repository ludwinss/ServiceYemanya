import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IReFill } from '../../interfaces/IReFill';
import { IController } from '../Controller';
import ReFillController from './ReFillController';

class BuilReFillProduct implements IController {
  private readonly _refillProduct;
  constructor(refillProduct: IReFill) {
    this._refillProduct = refillProduct;
  }
  madeNewProduct() {
    try {
      const newRefill = new ReFillController(this._refillProduct);
      newRefill.setController(this);
      newRefill.addNewProduct();
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

export default BuilReFillProduct;
