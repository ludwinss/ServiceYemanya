import { NextFunction, Request, Response } from 'express';

interface f<T> extends Request {
  body: T;
}
export type IControllerMiddleware<T> = (req: f<T>, res: Response, next?: NextFunction) => void;

export type IController<K extends string, T> = {
  [key in K]: IControllerMiddleware<T>;
};
