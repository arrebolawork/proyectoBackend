'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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