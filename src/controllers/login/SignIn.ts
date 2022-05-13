import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Login.constants';
import { IGenerateToken } from '../../interfaces/IGenerateToken';
import { ILogin } from '../../interfaces/IUser';
import { User } from '../../models';
import BuildController from '../Controller';

class SignIn extends BuildController {
  private _login: ILogin;
  private _generateToken: IGenerateToken;

  constructor(user: ILogin, generateToken: IGenerateToken) {
    super();
    this._login = user;
    this._generateToken = generateToken;
  }

  async start() {
    try {
      let foundUser = null;
      if (this._login.login) {
        foundUser = await this.loginByUser();
      }
      if (this._login.phone) {
        foundUser = await this.loginByPhone();
      }

      if (!foundUser) {
        return this.controller.run({}, EVENT_NULL);
      }

      this._generateToken.payload = String(foundUser.id);
      const newToken = this._generateToken.sign();
      return this.controller.run({ user: foundUser, token: newToken }, EVENT_OK);
    } catch (e: any) {
      return this.controller.run(e, EVENT_ERROR);
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
