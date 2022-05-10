import { Request, Response } from 'express';

import { response200, response404, response500 } from '../interfaces/APIresponse';
import { IProductPhoto } from '../interfaces/IProductPhoto';
import { DBConnection, MakeSell, Product, ProductPhoto, Stock, User } from '../models';

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
        // promisesProductPhoto.push(ProductPhoto.create(photo));
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
  },
  test: async (req, res) => {
    try {
      // const response = await DBConnection.getInstance().sync();
      //Server Error: TypeError: Converting circular structure to JSON\n    --> starting at object with constructor 'Sequelize'\n    |     property 'dialect' -> object with constructor 'PostgresDialect'\n    --- property 'sequelize' closes the circle
      // response.save()
      // if (!response) {
      //   res.status(404).send(response404('Product Photos'));
      // }
      // res.status(200).send(response200(response));
    } catch (e) {
      res.status(500).send(response500(String(e)));
    }
  }
};

export default productPhotoController;
