import { Transaction } from 'sequelize/types';

import { IReFill } from '../../interfaces/IReFill';
import { ReFill } from '../../models';

class ReFillController {
  public static createReFill(reFillProduct: IReFill, transaction: Transaction): Promise<IReFill | string> {
    return ReFill.create(reFillProduct, { transaction: transaction })
      .then((reFillInstance) => {
        if (!reFillInstance) throw reFillInstance;
        return reFillInstance.get({ plain: true });
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
