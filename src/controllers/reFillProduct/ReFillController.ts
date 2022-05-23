import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IReFill } from '../../interfaces/IReFill';
import { ReFill } from '../../models';
import BuildController from '../Controller';

class ReFillController extends BuildController {
  private _reFillProduct: IReFill = {} as IReFill;
  constructor(refillProduct: IReFill) {
    super();
    this._reFillProduct = refillProduct;
  }
  async addNewProduct() {
    try {
      const newFill = await ReFill.create(this._reFillProduct, { raw: true });
      if (!newFill) return this.controller.run({}, EVENT_NULL);

      return this.controller.run(newFill, EVENT_OK);
    } catch (error) {
      return this.controller.run(error as object, EVENT_ERROR);
    }
  }
  async deleteFill(idFill: number) {
    try {
      const foundFill = await ReFill.findByPk(idFill);
      if (!foundFill) return this.controller.run({}, EVENT_NULL);

      await foundFill.destroy();
      return this.controller.run(foundFill, EVENT_OK);
    } catch (error) {
      return this.controller.run(error as object, EVENT_ERROR);
    }
  }
}

export default ReFillController;
