import { NextFunction,Request, Response } from 'express';

import { INewUser as F } from '../interfaces/ILogin';
import RequestParse from '../services/request-parse.service';

class INewUser implements INewUser {}
function handleRequest(req: Request, res: Response, next: NextFunction) {
  const parse = new RequestParse<INewUser>('GET', req);
  parse.parseBody();
  next();
}
export { handleRequest };
