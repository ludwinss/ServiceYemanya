import { NextFunction, Request, Response } from 'express';

import GenerateToken from '../utils/GenerateToken';
import HttpReponse from '../utils/HttpResponse';

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error(`Didn't provider any Token`);
    }
    const values = await new GenerateToken().verified(token.split(' ')[1]);
    if (!values) {
      throw new Error(`Have problems with your token`);
    }
    if (values.rol === 'user') {
      throw new Error(`Doesn't have permissions`);
    }
    req.body['id_owner'] = values.sub;
    next();
  } catch (e: any) {
    res.status(401).send(HttpReponse.mistake(e));
  }
}

async function isLogged(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error(`Didn't provider any Token`);
    }
    const values = await new GenerateToken().verified(token.split(' ')[1]);
    if (!values) {
      throw new Error(`Have problems with your token`);
    }
    if (values.rol === 'admin') {
      throw new Error(`Doesn't have permissions`);
    }
    req.body['user'] = values.sub;
    next();
  } catch (e: any) {
    res.status(401).send(HttpReponse.mistake(e));
  }
}

export { isAdmin, isLogged };
