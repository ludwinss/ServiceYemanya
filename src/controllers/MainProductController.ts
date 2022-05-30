export type events = 'CREATE' | 'MODIFY' | 'ERROR';
export type handleParams = {
  event: events;
  res: undefined | object | any;
};

interface IProductHandler {
  setNextHandler(handler: IProductHandler): IProductHandler;
  handle(request: any): any;
}

abstract class ProductHandler implements IProductHandler {
  private nextHandler: IProductHandler;
  private state: Array<any> = [];
  public setNextHandler(handler: IProductHandler): IProductHandler {
    this.nextHandler = handler;
    return handler;
  }
  public handle(request: any): Promise<any> {
    if (this.nextHandler) return Promise.resolve(this.nextHandler.handle(request));

    return Promise.reject({ event: 'ERROR', res: undefined }).catch((e) => {
      throw new Error(e);
    });
  }
  public addState(data: any) {
    this.state.push(data);
  }
  public getState() {
    return this.state;
  }
}

abstract class State {
  public abstract create(): void;
  public abstract error(): void;
}

export { State };

export default ProductHandler;
