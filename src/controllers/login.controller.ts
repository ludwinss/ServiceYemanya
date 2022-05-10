import { ILogin, INewUser } from '../interfaces/ILogin';
import { DBConnection } from '../models';

const login: ILogin = {
  signIn: (req, res) => {
    console.log('ab');
  },
  signUp: (req, res) => {
    console.log(req.body);
  }
};

export default login;
