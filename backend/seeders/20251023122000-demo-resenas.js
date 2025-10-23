'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Resenas', [
      {
        comentario: 'Excelente vendedor, el producto llegó rápido y en perfecto estado.',
        puntaje: 5,
        usuarioQueCalificaId: 2, // María califica
        usuarioCalificadoId: 1,   // Juan recibe la reseña
        productoId: 1, // Producto de Juan
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comentario: 'El artículo era tal cual la descripción. Muy recomendable.',
        puntaje: 4,
        usuarioQueCalificaId: 2,
        usuarioCalificadoId: 1,
        productoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comentario: 'Buena comunicación con el comprador, todo perfecto.',
        puntaje: 5,
        usuarioQueCalificaId: 1, // Juan califica
        usuarioCalificadoId: 2,   // María recibe la reseña
        productoId: 3, // Producto de María
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Resenas', null, {});
  }
};
