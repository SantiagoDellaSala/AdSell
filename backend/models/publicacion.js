// backend/models/publicacion.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
    static associate(models) {
      Publicacion.belongsTo(models.Producto, { foreignKey: 'productoId' });
    }
  }
  Publicacion.init(
    {
      productoId: { type: DataTypes.INTEGER, allowNull: false },
      estado: { type: DataTypes.STRING, defaultValue: 'publicado' } // publicado, pendiente, eliminado
    },
    { sequelize, modelName: 'Publicacion' }
  );
  return Publicacion;
};
