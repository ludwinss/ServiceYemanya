import { NextFunction, Request, Response } from 'express';
import formidable, { Fields } from 'formidable';

import { response500 } from '../constants/APIresponse';
import { IProductPhoto } from '../utils/interfaces/IProductPhoto';

type FieldRequest = Pick<IProductPhoto, Exclude<keyof IProductPhoto, Fields>>;

function productImageHandle(req: Request, res: Response, next: NextFunction): void {
  const incoming = new formidable.IncomingForm();
  try {
    //Cath fields sending type ProductPhoto
    incoming.parse(req, (err, fields: any, files) => {
      if (err) {
        res.send(response500(String(err)))
      }
      const instanceImage: FieldRequest = fields;
      console.log(fields, instanceImage)
    })
    next();
  } catch (e) {
    res.send(response500(String(e)))
  }
}



export { productImageHandle };
