"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reviews.belongsTo(models.User);
      Reviews.belongsTo(models.Product);
    }
  }
  Reviews.init(
    {
      reviewText: {
        type: DataTypes.STRING(500), // Limita la longitud máxima a nivel de base de datos
        allowNull: false,
        validate: {
          notNull: {
            msg: "Por favor introduce la Review",
          },
          notEmpty: {
            msg: "La Review no puede estar vacía",
          },
          len: {
            args: [50, 500],
            msg: "La longitud debe de ser de 50 a 500 caracteres",
          },
        },
      },

      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
