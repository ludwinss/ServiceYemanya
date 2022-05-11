import { NextFunction, Request, Response } from 'express';

import { IUser } from '../../interfaces/ILogin';
import { GenerateToken } from '../../middlewares/GenerateToken';
import { User } from '../../models';
import HttpReponse from '../../utils/HttpResponse';
import { ParseBody } from '../../utils/ParseBody';
import { Controller } from '../Controller';

class SignUp implements Controller {
  async run(req: Request, res: Response) {
    try {
      const newUser: IUser = ParseBody.getParseJSON<IUser>(req.body);
      const responseDB = await User.create(newUser);

      if (!responseDB) res.status(400).send(HttpReponse.fail());

      const { id } = responseDB;
      const token = new GenerateToken(id, 'user').sign();

      res.status(201).send(HttpReponse.ok(token));
    } catch (e) {
      res.status(500).send(HttpReponse.mistake(String(e)));
    }
  }
}

export default SignUp;
