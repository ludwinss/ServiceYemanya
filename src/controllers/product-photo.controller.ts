import { Request, Response } from 'express';

import { response200, response404, response500 } from '../constants/APIresponse';
import { ProductPhoto } from '../models';
import { IProductPhoto } from '../utils/interfaces/IProductPhoto';

const productPhotoController: Record<string, (req: Request, res: Response) => void> = {
  getPhotoByProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await ProductPhoto.findAndCountAll({
        where: {
          id_product: id
        }
      });
      if (!response) {
        res.status(404).send(response404('Product Photo'));
      }
      res.status(200).send(response200(response));
    } catch (e) {
      res.status(500).send(response500(String(e)));
    }
  },
  createPhotoByProduct: async (req, res) => {
    try {
      const photo: IProductPhoto = {} as IProductPhoto;
      photo.id_product = req.body.id_product;
      const files = req.files as Express.Multer.File[];
      const promisesProductPhoto: Promise<any>[] = [];
      for (const file of files) {
        photo.legend = file.fieldname;
        photo.image = file.buffer;
        promisesProductPhoto.push(ProductPhoto.create(photo));
      }
      const response = await Promise.all(promisesProductPhoto);
      if (!response) {
        res.status(404).send(response404('Product Photos Create'));
      }
      res.status(200).send(response200(response));
    } catch (e) {
      res.status(500).send(response500(String(e)));
    }
  },
  deletePhotoByID: async (req, res) => {
    try {
      const { id } = req.body;
      const response = await ProductPhoto.destroy({ where: { id: id } });
      if (!response) {
        res.status(404).send(response404('Product Photos'));
      }
      res.status(200).send(response200(response));
    } catch (e) {
      res.status(500).send(response500(String(e)));
    }
  }
};

export default productPhotoController;
