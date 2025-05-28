'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    
    static associate(models) {
      OrderProduct.belongsTo(models.Product, { foreignKey: 'ProductId' });
      OrderProduct.belongsTo(models.Order, { foreignKey: 'OrderId' });
    }
  }
  OrderProduct.init({
    ProductId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    productCount: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};