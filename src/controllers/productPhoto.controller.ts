import { Request, Response } from 'express';

import {
  response200,
  response404,
  response500
} from '../constants/APIresponse';
import { ProductPhoto } from '../models';

const productPhotoController:
  Record<
    string,
    (req: Request, res: Response) => void> = {
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
      req.on('data', function (dat) {
        console.log(Buffer.from(dat).toString());
      });
      // const photo: IProductPhoto = req.body;
      // const f = Buffer.from(photo.image,'base64');
      // let imgData: any = new Blob([photo.image.buffer], { type: 'image/jpeg' });
      // const data = fs.readFile(photo.image, 'binary', (data) => {
      //     console.log(data)
      // })

      // const stream = Readable.from(photo.image.toString());
      // stream.on('readable', async (f: any) => {
      //     photo.image = stream.()
      //     const response = await ProductPhoto.create(photo);
      //     if (!response) {
      //         res.status(404).send(response404('Product Photo'));
      //     }
      //     res.status(200).send(response200(response))
      // })

      // var stream;
      // stream = await fs.createReadStream('E://image.jpg');

      // stream.on("data", async function (data) {
      //     // photo.image = data
      //     console.log(data.length, f.length)
      //     // const response = await ProductPhoto.create(photo);
      //     // if (!response) {
      //     //     res.status(404).send(response404('Product Photo'));
      //     // }
      //     // res.status(200).send(response200(response))
      // // });
      // photo.image = f
      // const response = await ProductPhoto.create(photo);
      // if (!response) {
      //     res.status(404).send(response404('Product Photo'));
      // }
      // res.status(200).send(response200(response))
    } catch (e) {
      res.status(500).send(response500(String(e)));
    }
  }
};

export default productPhotoController;
