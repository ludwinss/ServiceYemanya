import { Request } from 'express';

import { IEncryptData } from '../../interfaces/IEncryptData';
import { ILogin, IUser, Spread } from '../../interfaces/IUser';
import ParseBody from '../../utils/ParseBody';

class UserController {
  private _user: IUser;
  private _login: ILogin;
  private _Encryptor: IEncryptData;
  private _req: Request;
  constructor(req: Request, Encryptor: IEncryptData) {
    this._req = req;
    this._Encryptor = Encryptor;
    this._user = this.resetUser();
    this._login = this.resetLogin();
  }

  private Encode() {
    try {
      this._login.pwd = this._Encryptor.EncodeSHA(this._login.pwd);
    } catch (error) {
      throw new Error(`PWD Encryptor Error: ${error}`);
    }
  }
  getUser() {
    const parseUser = new ParseBody<IUser>(this._req, this._user);
    this._user = parseUser.parseBody();
    return Object.assign(this._user, this._login) as Spread<IUser, ILogin>;
  }
  getLogin() {
    const parseLogin = new ParseBody<ILogin>(this._req, this._login);
    this._login = parseLogin.parseBody();
    this.Encode();
    return this._login;
  }
  private resetLogin(): ILogin {
    return {
      login: String(),
      pwd: String()
    };
  }
  private resetUser(): IUser {
    return {
      name: String(),
      phone: String(),
      last_name: null,
      nickname: null,
      dni: null,
      email: null,
      address: null,
      login: String(),
      pwd: String()
    };
  }
}

export default UserController;
