import { NextFunction, Request, Response } from 'express';

function productImageHandle(req: Request, res: Response, next: NextFunction): void {
  next();
}

export { productImageHandle };
