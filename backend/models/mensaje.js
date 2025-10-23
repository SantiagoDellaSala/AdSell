// backend/models/mensaje.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
    static associate(models) {
      Mensaje.belongsTo(models.Usuario, { foreignKey: 'emisorId', as: 'Emisor' });
      Mensaje.belongsTo(models.Usuario, { foreignKey: 'receptorId', as: 'Receptor' });
      Mensaje.belongsTo(models.Producto, { foreignKey: 'productoId' });
    }
  }
  Mensaje.init(
    {
      emisorId: { type: DataTypes.INTEGER, allowNull: false },
      receptorId: { type: DataTypes.INTEGER, allowNull: false },
      productoId: { type: DataTypes.INTEGER },
      mensaje: { type: DataTypes.TEXT, allowNull: false },
      leido: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { sequelize, modelName: 'Mensaje' }
  );
  return Mensaje;
};
