import { Request } from 'express';

type kind = 'GET' | 'POST';

class RequestParse<T> {
  private _kind: kind;
  private _insteance: Request;
  constructor(kind: kind, req: Request) {
    this._kind = kind;
    this._insteance = req;
  }
  parseBody() {
    const body = this._insteance.body;
    const keys = Object.keys(body) as Array<keyof T>;
    console.log(keys);
  }
}

export default RequestParse;
