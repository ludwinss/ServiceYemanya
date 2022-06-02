import { IReFill } from '../../interfaces/IReFill';
import { ReFill } from '../../models';

class ReFillController {
  public static createReFill(reFillProduct: IReFill): Promise<ReFill | string> {
    console.log('entro');
    return ReFill.create(reFillProduct)
      .then((reFillInstance) => {
        if (!reFillInstance) throw reFillInstance;
        return reFillInstance;
      })
      .catch((error) => String(error));
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
