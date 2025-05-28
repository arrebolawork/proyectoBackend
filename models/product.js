'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
        foreignKey: 'ProductId',
        otherKey: 'OrderId'
      });
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};