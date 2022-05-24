import { IReFill } from '../../interfaces/IReFill';
import { ReFill } from '../../models';

class ReFillController {
  private _reFillProduct: IReFill = {} as IReFill;
  constructor(refillProduct: IReFill) {
    this._reFillProduct = refillProduct;
  }
  public async createReFill(): Promise<ReFill | string> {
    try {
      const newFill = await ReFill.create(this._reFillProduct, { raw: true });
      if (!newFill) throw null;
      return newFill;
    } catch (error) {
      return String(error);
    }
  }
  // async deleteReFill(idFill: number) {
  //   try {
  //     const foundFill = await ReFill.findByPk(idFill);
  //     if (!foundFill) return this.controller.run({}, EVENT_NULL);

  //     await foundFill.destroy();
  //     return this.controller.run(foundFill, EVENT_OK);
  //   } catch (error) {
  //     return this.controller.run(error as object, EVENT_ERROR);
  //   }
  // }
}

export default ReFillController;
