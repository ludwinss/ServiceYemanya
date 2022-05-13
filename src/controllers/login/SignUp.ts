import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Login.constants';
import { IGenerateToken } from '../../interfaces/IGenerateToken';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models';
import BuildController from '../Controller';

class SignUp extends BuildController {
  private _user: IUser;
  private _generateToken: IGenerateToken;
  constructor(user: IUser, generateToken: IGenerateToken) {
    super();
    this._user = user;
    this._generateToken = generateToken;
  }
  async start() {
    try {
      const newUser = await User.create(this._user);
      if (!newUser) {
        return this.controller.run({}, EVENT_NULL);
      }
      this._generateToken.payload = String(newUser.id);
      const newToken = this._generateToken.sign();
      return this.controller.run({ token: newToken, user: newUser }, EVENT_OK);
    } catch (e: any) {
      this.controller.run(e, EVENT_ERROR);
    }
  }
}
export default SignUp;
