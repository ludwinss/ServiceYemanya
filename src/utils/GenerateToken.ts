import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import { IGenerateToken, JwtPayloadExtends, roles } from '../interfaces/IGenerateToken';

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
  public verified(token: string): Promise<JwtPayloadExtends | undefined | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, mySecret, (err, payload) => {
        if (err) {
          return reject(err);
        }
        resolve(payload as JwtPayloadExtends);
      });
    });
  }
}

export default GenerateToken;
