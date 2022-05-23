import DBConnection from './DBConnection';
import MakeSell from './MakeSell';
import Owner from './Owner';
import Product from './Product';
import ProductPhoto from './ProductPhoto';
import ReFill from './ReFill';
import Stock from './Stock';
import User from './User';

//Relations  Product(1:M) ProductPhoto
Product.hasMany(ProductPhoto, {
  foreignKey: {
    name: 'id_product',
    allowNull: false
  }
});
ProductPhoto.belongsTo(Product, {
  foreignKey: {
    name: 'id_product',
    allowNull: false
  }
});

//Relations Stock (1:1) Product
Product.hasOne(Stock, {
  foreignKey: {
    name: 'id_product',
    allowNull: false
  }
});
Stock.belongsTo(Product, {
  foreignKey: {
    name: 'id_product',
    allowNull: false
  }
});

//Relationships (N:M) MakeSell User Product
User.belongsToMany(Product, { through: MakeSell, foreignKey: { name: 'id_user', allowNull: false } });
Product.belongsToMany(User, { through: MakeSell, foreignKey: { name: 'id_product', allowNull: false } });

//Relationships (N:M) ReFill Owner Product
Owner.belongsToMany(Product, { through: ReFill, foreignKey: { name: 'id_owner', allowNull: false } });
Product.belongsToMany(Owner, { through: ReFill, foreignKey: { name: 'id_product', allowNull: false } });

export { DBConnection, MakeSell, Owner, Product, ProductPhoto, ReFill, Stock, User };
