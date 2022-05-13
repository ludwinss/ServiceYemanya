import jwt, { JwtPayload } from 'jsonwebtoken';

import { IGenerateToken } from '../interfaces/IGenerateToken';

const mySecret = 'AH';

class GenerateToken implements IGenerateToken {
  private _payload: JwtPayload;
  constructor() {
    this._payload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      rol: 'user'
    };
  }
  public set payload(id_user: string) {
    this._payload.sub = id_user;
  }
  public set rol(rol: 'user' | 'admin') {
    this._payload.rol = rol;
  }
  public sign() {
    return jwt.sign(this._payload, mySecret, { algorithm: 'HS256' });
  }
  public verified(token: string) {
    return jwt.verify(token, mySecret);
  }
}

export default GenerateToken;
