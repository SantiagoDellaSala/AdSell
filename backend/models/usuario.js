// backend/models/usuario.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Producto, { foreignKey: 'usuarioId' });
      Usuario.hasMany(models.Mensaje, { foreignKey: 'emisorId', as: 'MensajesEnviados' });
      Usuario.hasMany(models.Mensaje, { foreignKey: 'receptorId', as: 'MensajesRecibidos' });
      Usuario.hasMany(models.Resena, { foreignKey: 'usuarioCalificadoId', as: 'ResenasRecibidas' });
      Usuario.hasMany(models.Resena, { foreignKey: 'usuarioQueCalificaId', as: 'ResenasEnviadas' });
    }
  }
  Usuario.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING },
      rol: { type: DataTypes.STRING, defaultValue: 'comprador' },
      verificado: { type: DataTypes.BOOLEAN, defaultValue: false },
      reputacion: { type: DataTypes.FLOAT, defaultValue: 0 },
      fotoPerfil: { type: DataTypes.STRING },
      dni: { type: DataTypes.STRING },
      emailVerificado: { type: DataTypes.BOOLEAN, defaultValue: false },
      telefonoVerificado: { type: DataTypes.BOOLEAN, defaultValue: false }

    },
    { sequelize, modelName: 'Usuario' }
  );
  return Usuario;
};
