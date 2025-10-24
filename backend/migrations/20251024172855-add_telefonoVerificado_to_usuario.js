'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Solo agregar las columnas que faltan
    await queryInterface.addColumn('Usuarios', 'telefonoVerificado', { 
      type: Sequelize.BOOLEAN, 
      defaultValue: false 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'telefonoVerificado');
  }
};
