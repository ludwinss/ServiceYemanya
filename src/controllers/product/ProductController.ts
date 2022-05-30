import { IProduct } from '../../interfaces/IProduct';
import { Product } from '../../models';

class ProductController {
  // async getById() {
  //   try {
  //     const id = this.parseProduct.parseID();
  //     const response = await Product.findByPk(id);
  //     if (!response) {
  //       return this.controller.run({}, EVENT_NULL);
  //     }
  //     return this.controller.run(response, EVENT_OK);
  //   } catch (e) {
  //     return this.controller.run(e as object, EVENT_ERROR);
  //   }
  // }

  // async modifyProductById() {
  //   try {
  //     const modifyFields = this.parseProduct.parseBodyUnStrict();
  //     const id = this.parseProduct.parseID();
  //     const oldProduct = await Product.findOne({
  //       where: { id: id },
  //       attributes: { exclude: ['create_at', 'update_at'] }
  //     });
  //     if (!oldProduct) {
  //       return this.controller.run({}, EVENT_NULL);
  //     }
  //     await oldProduct.update(modifyFields);
  //     return this.controller.run(oldProduct, EVENT_OK);
  //   } catch (e) {
  //     return this.controller.run(e as object, EVENT_ERROR);
  //   }
  // }
  // async getAll() {
  //   try {
  //     const response = await Product.findAll();
  //     if (!response) {
  //       return this.controller.run({}, EVENT_NULL);
  //     }
  //     return this.controller.run(response, EVENT_OK);
  //   } catch (e) {
  //     return this.controller.run(e as object, EVENT_ERROR);
  //   }
  // }
  static addProductWithoutPhoto(newProduct: IProduct) {
    return Product.create(newProduct)
      .then((product) => product)
      .catch((error) => String(error));
  }
}

export default ProductController;
