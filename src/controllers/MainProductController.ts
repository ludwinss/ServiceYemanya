interface ProductHandler {
  setNext(handler: ProductHandler): ProductHandler;
  handle(request: string): string | null;
}
abstract class MainProductController implements ProductHandler {
  private nextHandler: ProductHandler;
  constructor(handle: ProductHandler) {
    this.nextHandler = handle;
  }
  public setNext(handler: ProductHandler): ProductHandler {
    this.nextHandler = handler;
    return handler;
  }
  public handle(request: string): string | null {
    if (this.nextHandler) return this.nextHandler.handle(request);

    return null;
  }
}
