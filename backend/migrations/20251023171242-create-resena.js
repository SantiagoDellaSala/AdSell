'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resenas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioCalificadoId: {
        type: Sequelize.INTEGER
      },
      usuarioQueCalificaId: {
        type: Sequelize.INTEGER
      },
      productoId: {
        type: Sequelize.INTEGER
      },
      puntaje: {
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Resenas');
  }
};