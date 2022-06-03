import { EVENT } from '../../constants/response-events.constants';
import { IGenerateToken, roles } from '../../interfaces/IGenerateToken';
import { ILogin } from '../../interfaces/IUser';
import { Owner, User } from '../../models';
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
      const foundUser = await this.loginByUser();

      if (!foundUser) {
        return this.controller.run({}, EVENT.NULL);
      }

      this._generateToken.payload = String(foundUser.id);
      this._generateToken.rol = foundUser.rol;
      const newToken = this._generateToken.sign();
      return this.controller.run({ user: foundUser, token: newToken }, EVENT.OK);
    } catch (e: any) {
      return this.controller.run(e, EVENT.ERROR);
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

  async loginByUser(): Promise<(Owner & { rol: roles }) | (User & { rol: roles }) | null> {
    let foundOwnerByUser: Owner | null = null;
    const foundUserByUser = await User.findOne({
      where: {
        login: this._login.login,
        pwd: this._login.pwd
      },
      attributes: {
        exclude: ['login', 'pwd']
      }
    });

    if (!foundUserByUser) {
      foundOwnerByUser = await Owner.findOne({
        where: {
          login: this._login.login,
          pwd: this._login.pwd
        },
        attributes: {
          exclude: ['login', 'pwd']
        }
      });
    }

    if (foundUserByUser) return Object.assign(foundUserByUser, { rol: 'user' as roles });

    if (foundOwnerByUser) return Object.assign(foundOwnerByUser, { rol: 'admin' as roles });

    return null;
  }
}

export default SignIn;
