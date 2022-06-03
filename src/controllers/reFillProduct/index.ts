import { EVENT } from '../../constants/response-events.constants';
import { IReFill } from '../../interfaces/IReFill';
import ParseBody from '../../utils/ParseBody';
import { State } from '../MainProductController';
import BuildStock from '../stockController';
import ReFillController from './ReFillController';

class BuildReFillProduct extends State {
  public async create(): Promise<void> {
    try {
      const pbReFill = new ParseBody<IReFill>(this.context.params, this._resetReFillProduct());
      if (!this.context.transaction) throw null;
      const responseDB = await ReFillController.createReFill(pbReFill.parseBody(), this.context.transaction);
      if (typeof responseDB === 'string') throw responseDB;
      this.context.params = Object.assign(this.context.params, responseDB);
      if ('amount' in responseDB) {
        this.context.params['total'] = responseDB['amount'];
      }
      this.context.transitionTo(new BuildStock());
      this.context.requestCreate();
    } catch (error) {
      this.context.params = error;
      this.context.sendResponse(error === 'null' ? EVENT.NULL : EVENT.ERROR);
    }
  }
  public findByID(): void {
    this.context.params = 'not implement';
    this.context.sendResponse(EVENT.ERROR);
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
