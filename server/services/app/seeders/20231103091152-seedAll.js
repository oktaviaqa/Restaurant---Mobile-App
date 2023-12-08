'use strict';
const bcrypt = require ('bcryptjs')
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
   const user = require('../data/user.json').map(el => {
    delete el.id
    el.updatedAt = el.createdAt = new Date()
    el.password = bcrypt.hashSync(el.password, 10)

    return el
   })

   const category = require('../data/category.json').map(el => {
    delete el.id
    el.updatedAt =  el.createdAt = new Date()

    return el
   })

   const item = require('../data/items.json').map(el => {
    el.updatedAt =  el.createdAt = new Date()

    return el
   })

   const ingredient = require('../data/ingredient.json').map(el => {
    delete el.id
    el.updatedAt =  el.createdAt = new Date()

    return el
   })

   await queryInterface.bulkInsert('Users', user, {})
   await queryInterface.bulkInsert('Categories', category, {})
   await queryInterface.bulkInsert('Items', item, {})
   await queryInterface.bulkInsert('Ingredients', ingredient, {})
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ingredients', null, {})
    await queryInterface.bulkDelete('Items', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Users', null, {})
  }
};
