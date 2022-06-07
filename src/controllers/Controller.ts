import { EVENT } from '../constants/response-events.constants';

interface IController {
  run(send: object, event: string): any;
}

class BuildController {
  protected controller: IController;
  constructor(controller?: IController) {
    this.controller = controller!;
  }

  public setController(controller: IController) {
    this.controller = controller;
  }
}

type IEvent<T> = Promise<{ event: EVENT; res: string | T }>;

export default BuildController;
export { IController, IEvent };
