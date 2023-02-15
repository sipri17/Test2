'use strict';

const { generateHash } = require('../helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [{
      username: "Admin1",
      password : generateHash("test1"),
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      username: "Admin2",
      password : generateHash("test2"),
      createdAt : new Date(),
      updatedAt : new Date()
    }]

    await queryInterface.bulkInsert('Users', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {}, {
      truncate: true, restartIdentity: true, cascade: true
    });

  }
};