import { NextFunction,Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { IUser } from '../../interfaces/ILogin';
import { DBConnection, User } from '../../models';

interface Controller {
  run: (req: Request, res: Response, next: NextFunction) => void;
}

class LoginController<T> implements Controller {
  run(req: Request, res: Response) {
    this.signIn(req.body);
  }

  signIn(params: any) {
    try {
      const newUser = parseBody(params, defaulValue);
      console.log(newUser);
    } catch (e) {
      console.log(e);
    }
  }
}
function parseBody<T>(params: any, initValues: T) {
  try {
    const keys = Object.keys(initValues) as Array<keyof T>;
    for (const key of keys) {
      initValues[key] = params[key];
    }
    return initValues;
  } catch (e) {
    throw new Error(String(e));
  }
}

const defaulValue: IUser = {
  last_name: '',
  login: '',
  name: '',
  pwd: '',
  address: '',
  dni: '',
  email: '',
  nick_name: '',
  phone: ''
};

export default LoginController;
