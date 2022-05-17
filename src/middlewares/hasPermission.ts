import { NextFunction, Request, Response } from 'express';

import HttpReponse from '../utils/HttpResponse';
import GenerateToken from './GenerateToken';

function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error(`Doesn't have permissions`);
    }
    console.log(new GenerateToken().verified(token.split(' ')[1]));
    // next();
  } catch (e: any) {
    res.send(HttpReponse.mistake(e));
  }
}

export default isAdmin;
