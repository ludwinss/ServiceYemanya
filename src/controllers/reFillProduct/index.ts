import { EVENT_CREATE, EVENT_ERROR } from '../../constants/response-events.constants';
import { IReFill } from '../../interfaces/IReFill';
import ParseBody from '../../utils/ParseBody';
import { State } from '../MainProductController';
import ReFillController from './ReFillController';

class BuildReFillProduct extends State {
  private responseDB: { event: string; res: string | object };
  private pbReFill: ParseBody<IReFill>;
  private _req: any;
  constructor(req: any) {
    super();
    this._req = req;
    this.pbReFill = new ParseBody<IReFill>(req, this._resetReFillProduct());
  }
  private async addRegister() {
    try {
      const response = await ReFillController.createReFill(this.pbReFill.parseBody());
      if (typeof response === 'string') throw response;
      this.responseDB = { event: EVENT_CREATE, res: response };
    } catch (error) {
      this.responseDB = { event: EVENT_ERROR, res: String(error) as string };
    }
  }
  public async create(): Promise<void> {
    await this.addRegister();
    console.log('refillcontroller');
    if (this.responseDB.event === EVENT_ERROR) {
      return this.context.handleError();
    }
    const reqSuper = Object.assign(this._req, this.responseDB.res);
    if ('amount' in reqSuper) {
      reqSuper['total'] = reqSuper['amount'];
    }
    this.context.transitionTo(await new BuildReFillProduct(reqSuper));
    this.context.requestCreate();
  }
  public error(): void {
    console.log('error PE REfill');
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
