import { IEncryptData } from './IEncryptData';

export interface ILogin {
  login: string;
  pwd: string;
}

export interface IUser extends ILogin {
  name: string;
  phone: string;
  last_name: string | null;
  nick_name: string | null;
  dni: string | null;
  email: string | null;
  address: string | null;
}
type OptionalPropertyNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type Spread<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

class User {
  private _user: IUser;
  private _login: ILogin;
  private _kUser;
  private _kLogin;
  private _Encryptor: IEncryptData;
  private _params;
  constructor(params: any, Encryptor: IEncryptData) {
    this._params = params;
    this._Encryptor = Encryptor;
    this._user = this.resetUser();
    this._login = this.resetLogin();
    this._kUser = Object.keys(this._user) as Array<keyof IUser>;
    this._kLogin = Object.keys(this._login) as Array<keyof ILogin>;
  }
  private fillUser(params: any) {
    for (const key of this._kUser) {
      if (key in params) {
        if (params[key] === '' && this._user[key] !== null) {
          this.resetUser();
          throw new Error(`Doesn't allow fields empty`);
        }
        if (params[key] !== '') {
          this._user[key] = params[key];
        }
      }
    }
    const tmpFieldErrors = this._kUser.filter((key) => this._user[key] === String());
    if (tmpFieldErrors.length > 0) {
      throw new Error(`A field is missing ${tmpFieldErrors.join(', ').toLocaleUpperCase()}`);
    }
  }
  private fillLogin(params: any) {
    for (const key of this._kLogin) {
      if (key in params) {
        if (params[key] === '' && this._user[key] !== null) {
          this.resetLogin();
          throw new Error(`Doesn't allow fields empty`);
        }
        if (params[key] !== '') {
          this._login[key] = params[key];
        }
      }
    }
    const tmpFieldErrors = this._kLogin.filter((key) => this._login[key] === String());
    if (tmpFieldErrors.length > 0) {
      throw new Error(`A field is missing ${tmpFieldErrors.join(', ').toLocaleUpperCase()}`);
    }
    this.Encode();
  }
  private Encode() {
    try {
      this._login.pwd = this._Encryptor.EncodeSHA(this._login.pwd);
    } catch (error) {
      throw new Error(`PWD Encryptor Error: ${error}`);
    }
  }
  getUser() {
    this.fillUser(this._params);
    this.fillLogin(this._params);
    return Object.assign(this._user, this._login) as Spread<IUser, ILogin>;
  }
  getLogin() {
    this.fillLogin(this._params);
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
      nick_name: null,
      dni: null,
      email: null,
      address: null,
      login: String(),
      pwd: String()
    };
  }
}

export default User;
