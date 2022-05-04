import Product from "./Product";
import ProductPhoto from "./ProductPhoto";
import DBConnection from "./DBConnection";

Product.hasMany(ProductPhoto, { foreignKey: 'id_product' });

export { Product, DBConnection, ProductPhoto };