'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productos', [
      {
        usuarioId: 1,
        titulo: 'Notebook Lenovo IdeaPad 3',
        descripcion: 'Notebook Lenovo con Ryzen 5, 8GB RAM y SSD de 512GB. Excelente estado.',
        precio: 450000,
        categoria: 'Tecnología',
        estado: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 1,
        titulo: 'Zapatillas Nike Air Max',
        descripcion: 'Zapatillas originales Nike Air Max casi nuevas. Talle 42.',
        precio: 80000,
        categoria: 'Calzado',
        estado: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuarioId: 2,
        titulo: 'Silla Gamer Redragon',
        descripcion: 'Silla ergonómica Redragon para gamers, con respaldo reclinable y apoyabrazos 4D.',
        precio: 120000,
        categoria: 'Muebles',
        estado: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
