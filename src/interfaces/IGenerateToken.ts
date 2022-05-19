import { JwtPayload } from 'jsonwebtoken';

interface JwtPayloadExtends extends JwtPayload {
  rol: roles;
}

type roles = 'user' | 'admin';

interface IGenerateToken {
  sign(): string;
  verified(token: string): Promise<JwtPayloadExtends | null | undefined>;
  payload: string;
  rol: roles;
}

export { IGenerateToken, JwtPayloadExtends, roles };
