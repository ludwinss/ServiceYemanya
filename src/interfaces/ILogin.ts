import { IController } from './IControllers';

type loginController = 'signIn' | 'signUp';

export type ILogin = IController<loginController, INewUser>;

export type INewUser = {
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
