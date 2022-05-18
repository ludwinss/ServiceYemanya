import { EVENT_ERROR, EVENT_NULL, EVENT_OK } from '../../constants/Event.constants';
import { IGenerateToken } from '../../interfaces/IGenerateToken';
import { IUser } from '../../interfaces/IUser';
import { Owner } from '../../models';
import BuildController from '../Controller';

class SignUpAdmin extends BuildController {
  private _user: IUser;
  private _generateToken: IGenerateToken;
  constructor(user: IUser, generateToken: IGenerateToken) {
    super();
    this._user = user;
    this._generateToken = generateToken;
  }
  async start() {
    try {
      const newUser = await Owner.create(this._user);
      if (!newUser) {
        return this.controller.run({}, EVENT_NULL);
      }
      this._generateToken.payload = String(newUser.id);
      this._generateToken.rol = 'admin';
      const newToken = this._generateToken.sign();
      return this.controller.run({ token: newToken, user: newUser }, EVENT_OK);
    } catch (e: any) {
      this.controller.run(e, EVENT_ERROR);
    }
  }
}
export default SignUpAdmin;
