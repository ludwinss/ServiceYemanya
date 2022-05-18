import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadExtends extends JwtPayload {
  rol: roles;
}

export type roles = 'user' | 'admin';

interface IGenerateToken {
  sign(): string;
  verified(token: string): Promise<JwtPayloadExtends | null | undefined>;
  payload: string;
  rol: roles;
}

export { IGenerateToken };
