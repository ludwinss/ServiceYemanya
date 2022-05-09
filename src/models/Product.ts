import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize';

import DBConnection from '../models/DBConnection';
import MakeSell from './MakeSell';
import ProductPhoto from './ProductPhoto';
import Stock from './Stock';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<bigint>;
  declare name: string;
  declare description: string | null;
  declare category: string | null;
  declare type: string | null;
  declare created_at: Date;
  declare updated_at: Date;

  //Product(1:1)Stock
  declare stock: NonAttribute<Stock>;
  //Product(1:M)ProductPhoto
  declare productPhotos: NonAttribute<ProductPhoto[]>;
  //Product(1:M)MakeSell
  declare makeSells: NonAttribute<MakeSell[]>;

  declare static associations: {
    stock: Association<Product, Stock>;
    productPhotos: Association<Product, ProductPhoto>;
    makeSells: Association<Product, MakeSell>;
  };
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'product'
  }
);

export default Product;
