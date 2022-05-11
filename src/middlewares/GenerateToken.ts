import jwt, { Jwt,JwtPayload } from 'jsonwebtoken';

const mySecret = 'AH';

class GenerateToken<T> {
  private _payload: JwtPayload;
  constructor(id_user: T, rol: 'user' | 'admin') {
    this._payload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      id_user: id_user,
      rol: rol
    };
  }
  sign() {
    return jwt.sign(this._payload, mySecret, { algorithm: 'HS256' });
  }
  static veryfied(token: string) {
    jwt.verify(token, mySecret);
  }
}

export { GenerateToken };
