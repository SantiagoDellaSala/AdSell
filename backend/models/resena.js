// backend/models/resena.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resena extends Model {
    static associate(models) {
      Resena.belongsTo(models.Usuario, { foreignKey: 'usuarioCalificadoId', as: 'UsuarioCalificado' });
      Resena.belongsTo(models.Usuario, { foreignKey: 'usuarioQueCalificaId', as: 'UsuarioQueCalifica' });
      Resena.belongsTo(models.Producto, { foreignKey: 'productoId' });
    }
  }
  Resena.init(
    {
      usuarioCalificadoId: { type: DataTypes.INTEGER, allowNull: false },
      usuarioQueCalificaId: { type: DataTypes.INTEGER, allowNull: false },
      productoId: { type: DataTypes.INTEGER },
      puntaje: { type: DataTypes.INTEGER, allowNull: false },
      comentario: { type: DataTypes.TEXT }
    },
    { sequelize, modelName: 'Resena' }
  );
  return Resena;
};
