import { NextFunction, Request, Response } from 'express';

import { response500 } from '../constants/APIresponse';
import FileUpload from '../services/FileUpload';

function productImageHandle(req: Request, res: Response, next: NextFunction): void {
  try {
    //Cath fields sending type ProductPhoto
    const fiedlUpload = new FileUpload(req.app.get('tmp'), req);
    fiedlUpload.getFiles();
    next();
  } catch (e) {
    res.send(response500(String(e)));
  }
}

export { productImageHandle };
