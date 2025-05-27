"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("OrderProducts", {
      fields: ["ProductId"],
      type: "foreign key",
      name: "fk_orderproducts_product",
      references: {
        table: "Products",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("OrderProducts", {
      fields: ["OrderId"],
      type: "foreign key",
      name: "fk_orderproducts_order",
      references: {
        table: "Orders",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("OrderProducts", "fk_orderproducts_product");
    await queryInterface.removeConstraint("OrderProducts", "fk_orderproducts_order");
  },
};
