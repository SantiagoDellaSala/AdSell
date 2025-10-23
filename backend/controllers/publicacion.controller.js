// backend/controllers/publicacion.controller.js
const { Publicacion } = require('../models');

// Crear publicación
exports.crearPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.create(req.body);
    res.status(201).json(publicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar publicaciones de un producto
exports.listarPublicaciones = async (req, res) => {
  try {
    const { productoId } = req.query;
    const where = {};
    if (productoId) where.productoId = productoId;

    const publicaciones = await Publicacion.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado de publicación
exports.actualizarEstado = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) return res.status(404).json({ error: 'Publicación no encontrada' });
    publicacion.estado = req.body.estado || publicacion.estado;
    await publicacion.save();
    res.json(publicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
