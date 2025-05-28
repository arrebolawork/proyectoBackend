"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }
    async validatePassword(password) {
      return await bcrypt.compare(password, this.passwd);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      passwd: DataTypes.STRING,
      birthday: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    if (user.passwd) {
      const salt = await bcrypt.genSalt(10);
      user.passwd = await bcrypt.hash(user.passwd, salt);
    }
  });
  User.beforeUpdate(async (user, options) => {
    if (user.changed("passwd")) {
      const salt = await bcrypt.genSalt(10);
      user.passwd = await bcrypt.hash(user.passwd, salt);
    }
  });

  return User;
};