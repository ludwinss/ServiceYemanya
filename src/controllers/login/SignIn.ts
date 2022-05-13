import { VERIFY_ERROR, VERIFY_NULL, VERIFY_OK } from '../../constants/Login.constants';
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
      let foundUser = {} as User | null;
      if (this._login.phone) {
        foundUser = await this.loginByPhone();
        if (foundUser) {
          this._generateToken.payload=String( foundUser.id );
          const newToken = this._generateToken.sign();
          return this.controller.run({user:foundUser,token:newToken}, VERIFY_OK);
        }
      }else{
        foundUser = await this.loginByUser();
        if (foundUser) {
          this._generateToken.payload=String( foundUser.id );
          const newToken = this._generateToken.sign();
          return this.controller.run({user:foundUser,token:newToken}, VERIFY_OK);
        }
      }

      return this.controller.run({}, VERIFY_NULL);
    } catch (e: any) {
      this.controller.run(e, VERIFY_ERROR);
    }
  }

  async loginByPhone() {
    try{
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
    }catch(e:any){
      throw new Error(e)
    }
  }

  async loginByUser() {
    try {
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

    } catch (e:any) {
      throw new Error(e)

    }
  }
}

export default SignIn;
