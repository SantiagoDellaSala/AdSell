'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed1 = await bcrypt.hash('password123', 10);
    const hashed2 = await bcrypt.hash('password456', 10);

    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        password: hashed1,
        telefono: '1122334455',
        rol: 'vendedor',
        verificado: true,
        reputacion: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María López',
        email: 'maria@example.com',
        password: hashed2,
        telefono: '1199887766',
        rol: 'comprador',
        verificado: true,
        reputacion: 4.8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
