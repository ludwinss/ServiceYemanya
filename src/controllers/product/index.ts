import { IProduct } from '../../interfaces/IProduct';
import ParseBody from '../../utils/ParseBody';
import ProductHandler from '../MainProductController';
import ProductController from './ProductController';

class BuildProduct extends ProductHandler {
  public runaa(data:any) {
    this.handle({ event: 'CREATE',data });
  }

  // public madeFindAllProducts() {
  //   try {
  //     const findAll = new ProductController();
  //     findAll.setController(this);
  //     findAll.getAll();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  // public adeFindOneProductById() {
  //   try {
  //     const findById = new ProductController(this._req);
  //     findById.setController(this);
  //     findById.getById();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  private async madeNewProductWithoutPhoto(newProduct:IProduct) {
    try {
      return  await new ProductController(newProduct).addProductWithoutPhoto();
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  // private madeChangesOnProduct() {
  //   try {
  //     const madeChanges = new ProductController(this._req);
  //     madeChanges.setController(this);
  //     madeChanges.modifyProductById();
  //   } catch (error) {
  //     this.run(error as object, EVENT_ERROR);
  //   }
  // }
  async handleEvent(data:any) {
    try{

    const {event}=data;
    console.log(data.data.body)
    switch (event) {
      case 'CREATE':
        return await this.madeNewProductWithoutPhoto(new ParseBody<IProduct>(data.data,this._resetProduct()).parseBody());
      default:
        return {};
    }
    }catch(error){
      console.log(error)
    }
  }

  public async handle(request: any) {
    const data = await this.handleEvent(request);
    console.log(data)


    return super.handle({ event: 'CREATE', data });
  }

  private _resetProduct(): IProduct {
    return {
      name: '',
      description: null,
      category: null,
      type: null
    };
  }
}
export default BuildProduct;
