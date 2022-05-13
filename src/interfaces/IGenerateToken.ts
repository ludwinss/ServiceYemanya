import { JwtPayload } from "jsonwebtoken";

interface IGenerateToken {
  sign(): string;
  verified(token: string): string|JwtPayload,
  payload:string,
  rol:'user'|'admin',
}

export { IGenerateToken };
