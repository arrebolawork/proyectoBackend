"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
        foreignKey: "ProductId",
        otherKey: "OrderId",
      });
      Product.hasMany(models.Reviews);
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Por favor introduce el nombre" },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Por favor introduce el precio" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
