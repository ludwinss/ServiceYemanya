import { Transaction } from 'sequelize/types';

import { EVENT } from '../../constants/response-events.constants';
import { IReFill } from '../../interfaces/IReFill';
import ParseBody from '../../utils/ParseBody';
import { IEvent } from '../Controller';
import ReFillController from './ReFillController';

class BuildReFillProduct {
  #pbReFill: ParseBody<IReFill>;
  constructor(params: Partial<IReFill>) {
    this.#pbReFill = new ParseBody(params, this._resetReFillProduct());
  }
  public async create(transaction: Transaction): IEvent<IReFill> {
    try {
      const responseDB = await ReFillController.createReFill(this.#pbReFill.parseBody(), transaction);
      if (typeof responseDB === 'string') throw responseDB;
      return { event: EVENT.OK, res: responseDB };
    } catch (error) {
      return { event: EVENT.ERROR, res: String(error) };
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

export default BuildReFillProduct;
