import DBConnection from "./DBConnection";
import Product from "./Product";
import ProductPhoto from "./ProductPhoto";

Product.hasMany(ProductPhoto, { foreignKey: "id_product" });

export { DBConnection, Product, ProductPhoto };
