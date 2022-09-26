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
import ReFill from './ReFill';
import Stock from './Stock';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<bigint>;
  declare name: string;
  declare description: string | null;
  declare category: string | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  //Product(1:1)Stock
  declare stock?: NonAttribute<Stock>;
  //Product(1:M)ProductPhoto
  declare productPhotos?: NonAttribute<ProductPhoto[]>;
  //Product(1:M)MakeSell
  declare makeSells?: NonAttribute<MakeSell[]>;
  //Product(1:M)ReFill
  declare reFills?: NonAttribute<ReFill[]>;

  declare static associations: {
    stock: Association<Product, Stock>;
    productPhotos: Association<Product, ProductPhoto>;
    makeSells: Association<Product, MakeSell>;
    reFills: Association<Product, ReFill>;
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
      allowNull: false,
      defaultValue: 'otros'
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'product',
    hooks: {
      beforeCreate: (record, options) => {
        record.created_at = new Date();
        record.updated_at = new Date();
      },
      beforeUpdate: (record, options) => {
        record.updated_at = new Date();
      }
    }
  }
);

export default Product;
