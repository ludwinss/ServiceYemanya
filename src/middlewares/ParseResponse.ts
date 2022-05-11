import { Request, Response } from 'express';

function ParseResponse(req: Request, res: Response) {
  console.log(req);
}
export { ParseResponse };
