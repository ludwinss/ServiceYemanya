import { CREATE, CREATE_ERROR } from '../../constants/Login.constants';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models';
import BuildController from '../Controller';

class SignUp extends BuildController {
  private _user: IUser;
  constructor(user: IUser) {
    super();
    this._user = user;
  }
  async start() {
    try {
      const newUser = await User.create(this._user);
      this.controller.run(newUser.id, CREATE);
    } catch (e: any) {
      this.controller.run(e, CREATE_ERROR);
    }
  }
}
export default SignUp;
