import { Response, Request } from "express";

interface IProductController {
    getAll: (req: Request, res: Response) => void

}
const productController: IProductController = {
    getAll: (req, res) => {
        res.status(200).send("agh otra ves tu")
    }
}

export default productController;