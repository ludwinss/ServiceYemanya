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
  public handle(request: any): any {
    console.log(request);
    if (this.nextHandler) return this.nextHandler.handle(request);

    return null;
  }
  public addState(data: any) {
    this.state.push(data);
  }
  public getState() {
    return this.state;
  }
}

export default ProductHandler;
