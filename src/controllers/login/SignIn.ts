import { VERIFY, VERIFY_ERROR, VERIFY_NULL } from '../../constants/Login.constants';
import { ILogin } from '../../interfaces/IUser';
import { User } from '../../models';
import BuildController from '../Controller';

class SignIn extends BuildController {
  private _login: ILogin;

  constructor(user: ILogin) {
    super();
    this._login = user;
  }

  async start() {
    try {
      let foundUser = {} as User | null;

      if (this._login.phone) {
        foundUser = await this.loginByPhone();
        if (foundUser) this.controller.run(foundUser, VERIFY);
      }

      if (this._login.login) {
        foundUser = await this.loginByUser();
        if (foundUser) this.controller.run(foundUser, VERIFY);
      }

      if (!foundUser) this.controller.run({}, VERIFY_NULL);
    } catch (e: any) {
      this.controller.run(e, VERIFY_ERROR);
    }
  }

  async loginByPhone() {
    const foundUserByPhone = await User.findOne({
      where: {
        phone: this._login.phone,
        pwd: this._login.pwd
      },
      attributes: {
        exclude: ['login', 'pwd']
      }
    });
    return foundUserByPhone;
  }

  async loginByUser() {
    const foundUserByUser = await User.findOne({
      where: {
        login: this._login.login,
        pwd: this._login.pwd
      },
      attributes: {
        exclude: ['login', 'pwd']
      }
    });
    return foundUserByUser;
  }
}

export default SignIn;
