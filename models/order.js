'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: 'OrderId',
        otherKey: 'ProductId'
      });
    }
  }
  Order.init({
    orderDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};