import Product from "./Product";
import ProductPhoto from "./ProductPhoto";
import DBConnection from "./DBConnection";

ProductPhoto.hasMany(Product);
Product.belongsTo(ProductPhoto, { foreignKey: 'id_product' })

export { Product, DBConnection };