import { CREATE_ERROR, CREATE_OK,CREATE_NULL } from '../../constants/Login.constants';
import { IGenerateToken } from '../../interfaces/IGenerateToken';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models';
import BuildController from '../Controller';

class SignUp extends BuildController {
  private _user: IUser;
  private _generateToken:IGenerateToken;
  constructor(user: IUser,generateToken:IGenerateToken) {
    super();
    this._user = user;
    this._generateToken=generateToken;
  }
  async start() {
    try {
      const newUser = await User.create(this._user);
      if(newUser){
        this._generateToken.payload=String(newUser.id);
        const newToken=this._generateToken.sign();
        return this.controller.run({token:newToken,user:newUser}, CREATE_OK);
      }
      return this.controller.run({},CREATE_NULL)
    } catch (e: any) {
      this.controller.run(e, CREATE_ERROR);
    }
  }
}
export default SignUp;
