import { Response, Request } from "express";
import { Product } from "../models";
import { response200, response404, response500 } from "../constants/APIresponse";

const productController: Record<string, (req: Request, res: Response) => void> = {
    getAll: async (req, res) => {
        try {
            const response = await Product.findAll();
            if (!response) {
                res.status(404).send(response404('Product'));
            }
            res.status(200).send(response200(response))
        } catch (e) {
            res.status(500).send(response500(String(e)))
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await Product.findByPk(id);
            if (!response) {
                res.status(404).send(response404('Product by ID'));
            }
            res.status(200).send(response200(response))
        } catch (e) {
            res.status(500).send(response500(String(e)))
        }
    },
    addProductWithoutPhoto: async (req, res) => {
        try {
            const { name, description, type, category }: { name: string, description: string, type: string, category: string } = req.body;
            const response = await Product.create({ name: name, description: description, type: type, category: category });
            if (!response) {
                res.status(404).send(response404('Product by ID'));
            }
            res.status(200).send(response200(response))
        } catch (e) {
            res.status(500).send(response500(String(e)))
        }
    }
}

export default productController;