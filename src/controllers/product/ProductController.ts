import { Transaction } from 'sequelize/types';

import { IProduct } from '../../interfaces/IProduct';
import { Product, ProductPhoto, Stock } from '../../models';

class ProductController {
  public static async modifyProductById(foundProduct: Partial<IProduct>, id: number) {
    try {
      const oldProduct = await Product.findOne({
        where: { id: id },
        attributes: { exclude: ['create_at', 'update_at'] }
      });
      if (!oldProduct) {
        throw oldProduct;
      }
      await oldProduct.update(foundProduct);
      return oldProduct;
    } catch (e) {
      return String(e);
    }
  }
  public static getAll() {
    return Product.findAll({
      attributes: ['name', 'description', 'category', 'type'],
      include: [{ model: Stock, attributes: ['total', 'price', 'id', 'updated_at', 'id_product'] }]
    })
      .then((product) => {
        if (!product) throw product;
        return product;
      })
      .catch((error) => String(error));
  }

  public static getById(id: number) {
    return Product.findByPk(id, { include: [Stock, ProductPhoto] })
      .then((product) => {
        if (!product) throw product;
        return product;
      })
      .catch((error) => String(error));
  }

  static addProductWithoutPhoto(newProduct: IProduct, transaction: Transaction): Promise<IProduct | string> {
    return Product.create(newProduct, { transaction: transaction })
      .then((product) => {
        if (!product) throw product;
        return product.get({ plain: true });
      })
      .catch((error) => String(error));
  }
}

export default ProductController;
