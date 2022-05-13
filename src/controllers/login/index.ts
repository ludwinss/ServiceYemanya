import { Request, Response } from 'express';

import { CREATE_ERROR, CREATE_NULL, CREATE_OK, VERIFY_ERROR, VERIFY_NULL, VERIFY_OK } from '../../constants/Login.constants';
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
    const _signIn = new SignIn(this._user.getLogin(), new GenerateToken());
    _signIn.setController(this);
    _signIn.start();
  }

  madeSignUp() {
    const _signUp = new SignUp(this._user.getUser(),new GenerateToken());
    _signUp.setController(this);
    _signUp.start();
  }

  run(send: object, event: string) {
    console.log(event,send);
    switch (event) {
      case  VERIFY_OK||CREATE_OK :
        console.log(event,send);
        this._res.status(201).send(HttpResponse.ok(send));
        break;
      case CREATE_ERROR || VERIFY_ERROR:
        this._res.status(400).send(HttpResponse.mistake(JSON.stringify(send)));
        break;
      case VERIFY_NULL ||CREATE_NULL:
        this._res.status(200).send(HttpResponse.fail());
        break;
    }
  }
}

export default buildLogin;
