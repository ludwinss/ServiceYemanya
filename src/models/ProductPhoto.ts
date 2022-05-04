import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import DBConnection from "./DBConnection";

class ProductPhoto extends Model<
  InferAttributes<ProductPhoto>,
  InferCreationAttributes<ProductPhoto>
> {
  declare id: CreationOptional<bigint>;

  declare id_product: bigint;

  declare image: bigint;

  declare legend: string;
}

ProductPhoto.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_product: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    legend: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: DBConnection.getInstance(),
    tableName: "product_photo",
  }
);

export default ProductPhoto;
