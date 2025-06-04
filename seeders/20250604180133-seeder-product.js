'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Products', [
      {
        name: 'xiaomi',
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: 'huawei',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: 'iphone',
        price: 1600,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: 'samsung',
        price: 1100,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: 'oppo',
        price: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  }
};
