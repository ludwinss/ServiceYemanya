import { Request, Response } from "express"
import { response200, response404, response500 } from "../constants/APIresponse";
import ProductPhoto from "../models/ProductPhoto";
import { IProductPhoto } from "utils/interfaces/IProductPhoto";
import fs from 'fs';

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
            res.status(200).send(response200(response))
        } catch (e) {
            res.status(500).send(response500(String(e)))
        }
    },
    createPhotoByProduct: async (req, res) => {
        try {
            const photo: IProductPhoto = req.body;
            // photo.image = Buffer.from(photo.image, 'base64');
            var stream;
            var f;
            stream = await fs.createReadStream("E://image.jpg");

            stream.on("data", async function (data) {
                photo.image = data
                const response = await ProductPhoto.create(photo);
                if (!response) {
                    res.status(404).send(response404('Product Photo'));
                }
                res.status(200).send(response200(response))
            });
            // let imgData = new Blob([photo.image.buffer], { type: 'image/jpeg' });
            // photo.image = imgData.stream()
            //    photo.image = imgData
            // const response = await ProductPhoto.create(photo);
            // if (!response) {
            //     res.status(404).send(response404('Product Photo'));
            // }
            // res.status(200).send(response200(response))
        } catch (e) {
            res.status(500).send(response500(String(e)))
        }
    },
}

export default productPhotoController;