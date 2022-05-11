import { NextFunction, Request, Response } from 'express';

export type IControllerMiddleware<T> = (req: Request, res: Response, next?: NextFunction) => void;

export type IController<K extends string, T> = {
  [key in K]: IControllerMiddleware<T>;
};
