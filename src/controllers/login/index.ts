import { Request, Response } from 'express';

import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Login.constants';
import { IEncryptData } from '../../interfaces/IEncryptData';
import User from '../../interfaces/IUser';
import EncryptData from '../../middlewares/EncryptData';
import GenerateToken from '../../middlewares/GenerateToken';
import HttpResponse from '../../utils/HttpResponse';
import { IController } from '../Controller';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpAdmin from './SignUpAdmin';

class buildLogin implements IController {
  private _res: Response;
  private _req: Request;
  private encryptor: IEncryptData;

  constructor(req: Request, res: Response) {
    this._res = res;
    this._req = req;
    this.encryptor = new EncryptData();
  }

  async madeSignIn() {
    try {
      const _signIn = new SignIn(new User(this._req.body, this.encryptor).getLogin(), new GenerateToken());
      _signIn.setController(this);
      await _signIn.start();
    } catch (error: any) {
      return this.run(error, EVENT_ERROR);
    }
  }

  async madeSignUp() {
    try {
      const _signUp = new SignUp(new User(this._req.body, this.encryptor).getUser(), new GenerateToken());
      _signUp.setController(this);
      await _signUp.start();
    } catch (error: any) {
      this.run(error, EVENT_ERROR);
    }
  }
  async madeSignUpAdmin() {
    try {
      const _signUpAdmin = new SignUpAdmin(new User(this._req.body, this.encryptor).getUser(), new GenerateToken());
      _signUpAdmin.setController(this);
      await _signUpAdmin.start();
    } catch (error: any) {
      this.run(error, EVENT_ERROR);
    }
  }

  run(send: object, event: string) {
    switch (event) {
      case EVENT_OK:
        this._res.status(201).send(HttpResponse.ok(send));
        break;
      case EVENT_ERROR:
        this._res.status(400).send(HttpResponse.mistake(String(send)));
        break;
      case EVENT_NULL:
        this._res.status(500).send(HttpResponse.fail());
        break;
    }
  }
}

export default buildLogin;
