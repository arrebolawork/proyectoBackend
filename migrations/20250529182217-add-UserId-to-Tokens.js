"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Tokens", {
      fields: ["UserId"],
      type: "foreign key",
      name: "fk_tokens_userid",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Tokens", "fk_tokens_userid");
  },
};