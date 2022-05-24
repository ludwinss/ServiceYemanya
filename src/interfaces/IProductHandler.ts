export interface IProductHandler {
  setNext(handler: IProductHandler): IProductHandler;
  handle(request: any): any;
}
