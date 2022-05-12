import jwt, { JwtPayload } from 'jsonwebtoken';

const mySecret = 'AH';

class GenerateToken<T> {
  private _payload: JwtPayload;
  constructor(id_user: T) {
    this._payload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      id_user: id_user,
      rol: 'user'
    };
  }
  set rol(newRol: 'user' | 'admin') {
    this._payload.rol = newRol;
  }
  sign() {
    return jwt.sign(this._payload, mySecret, { algorithm: 'HS256' });
  }
  static veryfied(token: string) {
    jwt.verify(token, mySecret);
  }
}

export default GenerateToken;
