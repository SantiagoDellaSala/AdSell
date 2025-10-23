'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mensajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emisorId: {
        type: Sequelize.INTEGER
      },
      receptorId: {
        type: Sequelize.INTEGER
      },
      productoId: {
        type: Sequelize.INTEGER
      },
      mensaje: {
        type: Sequelize.TEXT
      },
      leido: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mensajes');
  }
};