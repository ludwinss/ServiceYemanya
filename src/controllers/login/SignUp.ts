import { EVENT } from '../../constants/response-events.constants';
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
        return this.controller.run({}, EVENT.NULL);
      }
      this._generateToken.payload = String(newUser.id);
      const newToken = this._generateToken.sign();
      return this.controller.run({ token: newToken, user: newUser }, EVENT.OK);
    } catch (e: any) {
      this.controller.run(e, EVENT.ERROR);
    }
  }
}
export default SignUp;
