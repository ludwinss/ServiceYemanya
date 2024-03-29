import { NextFunction, Request, Response } from 'express';

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
export default BuildController;
export { IController };
