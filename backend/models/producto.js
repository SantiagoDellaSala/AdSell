// backend/models/producto.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Producto.hasMany(models.Mensaje, { foreignKey: 'productoId' });
      Producto.hasMany(models.Publicacion, { foreignKey: 'productoId' });
      Producto.hasMany(models.Resena, { foreignKey: 'productoId' });
    }
  }
  Producto.init(
    {
      usuarioId: { type: DataTypes.INTEGER, allowNull: false },
      titulo: { type: DataTypes.STRING, allowNull: false },
      descripcion: { type: DataTypes.TEXT },
      precio: { type: DataTypes.DECIMAL, allowNull: false },
      categoria: { type: DataTypes.STRING },
      estado: { type: DataTypes.STRING, defaultValue: 'activo' } // activo, vendido, archivado
    },
    { sequelize, modelName: 'Producto' }
  );
  return Producto;
};
