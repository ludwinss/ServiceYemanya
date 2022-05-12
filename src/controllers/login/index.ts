import { Request, Response } from 'express';

import { CREATE, CREATE_ERROR, VERIFY } from '../../constants/Login.constants';
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

  madeSignIn() {
    const _signIn = new SignIn(this._user.getLogin());
    _signIn.setController(this);
    _signIn.start();
  }

  madeSignUp() {
    const _signUp = new SignUp(this._user.getUser());
    _signUp.setController(this);
    _signUp.start();
  }

  run(send: any, event: string) {
    console.log(event);
    switch (event) {
      case CREATE:
        this._res.status(201).send(HttpResponse.ok(this.instanceToken(send)));
        break;
      case CREATE_ERROR:
        this._res.status(400).send(HttpResponse.mistake(JSON.stringify(send)));
        break;
      case VERIFY:
        this._res.status(200).send(HttpResponse.ok({ user: send, token: this.instanceToken(send.id) }));
    }
  }

  private instanceToken<T>(payload: T) {
    return new GenerateToken(payload).sign();
  }
}

export default buildLogin;
