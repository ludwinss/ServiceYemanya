import { Request, Response } from 'express';

import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Login.constants';
import User from '../../interfaces/IUser';
import GenerateToken from '../../middlewares/GenerateToken';
import HttpResponse from '../../utils/HttpResponse';
import { IController } from '../Controller';
import SignIn from './SignIn';
import SignUp from './SignUp';

class buildLogin implements IController {
  private _user: User;
  private _res: Response;

  constructor(req: Request, res: Response) {
    this._user = new User(req.body);
    this._res = res;
  }

  async madeSignIn() {
    const _signIn = new SignIn(this._user.getLogin(), new GenerateToken());
    _signIn.setController(this);
    await _signIn.start();
  }

  async madeSignUp() {
    const _signUp = new SignUp(this._user.getUser(), new GenerateToken());
    _signUp.setController(this);
    await _signUp.start();
  }

  run(send: object, event: string) {
    switch (event) {
      case EVENT_OK:
        this._res.status(201).send(HttpResponse.ok(send));
        break;
      case EVENT_ERROR:
        this._res.status(400).send(HttpResponse.mistake(JSON.stringify(send)));
        break;
      case EVENT_NULL:
        this._res.status(200).send(HttpResponse.fail());
        break;
    }
  }
}

export default buildLogin;
