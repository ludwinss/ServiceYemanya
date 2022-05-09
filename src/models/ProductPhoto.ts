import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize';

import DBConnection from './DBConnection';
import Product from './Product';

class ProductPhoto extends Model<InferAttributes<ProductPhoto>, InferCreationAttributes<ProductPhoto>> {
  declare id: CreationOptional<bigint>;
  declare image: bigint;
  declare legend: string;
  declare created_at: Date;
  declare updated_at: Date;

  //Product(1:M)ProductPhoto
  declare id_product: ForeignKey<Product['id']>;
  declare product: NonAttribute<Product>;
}

ProductPhoto.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    legend: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: 'product_photo'
  }
);

export default ProductPhoto;
