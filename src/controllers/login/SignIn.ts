import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Login.constants';
import { IGenerateToken } from '../../interfaces/IGenerateToken';
import { ILogin } from '../../interfaces/IUser';
import { DBConnection, User } from '../../models';
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
    2;
    try {
      let foundUser: any = null;
      if (this._login.login) {
        foundUser = await this.loginByUser();
      }

      if (!foundUser) {
        return this.controller.run({}, EVENT_NULL);
      }

      console.log(foundUser[0][0].rol);
      foundUser = foundUser[0][0];

      this._generateToken.payload = String(foundUser.id);
      this._generateToken.rol = foundUser.rol;
      const newToken = this._generateToken.sign();
      return this.controller.run({ user: foundUser[0][0], token: newToken }, EVENT_OK);
    } catch (e: any) {
      return this.controller.run(e, EVENT_ERROR);
    }
  }

  // async loginByPhone() {
  //   const foundUserByPhone = await User.findOne({
  //     where: {
  //       phone: this._login.phone,
  //       pwd: this._login.pwd
  //     },
  //     attributes: {
  //       exclude: ['login', 'pwd']
  //     }
  //   });
  //   return foundUserByPhone;
  // }

  async loginByUser() {
    const foundUserByUser = await DBConnection.getInstance().query(
      `
    SELECT *  FROM (SELECT id, name, login ,phone  ,email ,'user' as rol,pwd FROM "user"
    UNION ALL
    SELECT id,fullname,login,phone,email ,'admin' as rol ,pwd FROM "owner") as tmp
    where tmp.login=:login and tmp.pwd=:pwd
    `,
      {
        replacements: {
          login: this._login.login,
          pwd: this._login.pwd
        }
      }
    );
    return foundUserByUser;
  }
}

export default SignIn;
