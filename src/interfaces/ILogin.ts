import { IController } from './IControllers';

type loginController = 'signIn' | 'signUp';

export type ILogin = IController<loginController, IUser>;

export type IUser = {
  name: string;
  last_name: string | null;
  nick_name: string;
  phone: string;
  login: string;
  pwd: string;
  dni: string;
  email: string;
  address: string;
};
