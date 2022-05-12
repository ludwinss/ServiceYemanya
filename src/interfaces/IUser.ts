export interface ILogin {
  login: string;
  phone: string;
  pwd: string;
}

export interface IUser extends ILogin {
  name: string;
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
  constructor(params: any) {
    [this._user, this._login] = this.fillUser(params);
  }
  private fillUser(params: any) {
    return [params, params];
  }
  getUser() {
    return Object.assign(this._user, this._login) as Spread<IUser, ILogin>;
  }
  getLogin() {
    return this._login;
  }
}

export default User;
