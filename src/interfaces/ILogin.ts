import { IController } from './IControllers';

type loginController = 'signIn' | 'signUp';

export type ILogin = IController<loginController, IUser>;

export type IUser = {
  name: string;
  last_name: string;
  nick_name?: string;
  phone?: string;
  login: string;
  pwd: string;
  dni?: string;
  email?: string;
  address?: string;
};

export class User implements IUser {
  address?: string | undefined;
  dni?: string | undefined;
  email?: string | undefined;
  last_name: string;
  login: string;
  name: string;
  nick_name?: string | undefined;
  phone?: string | undefined;
  pwd: string;
  constructor() {
    this.last_name = '';
    this.login = '';
    this.name = '';
    this.pwd = '';
  }
}
