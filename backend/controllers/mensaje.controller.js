// backend/controllers/mensaje.controller.js
const { Mensaje } = require('../models');

// Crear mensaje
exports.crearMensaje = async (req, res) => {
  try {
    const mensaje = await Mensaje.create(req.body);
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar mensajes entre dos usuarios (opcional por producto)
exports.listarMensajes = async (req, res) => {
  try {
    const { emisorId, receptorId, productoId } = req.query;
    const where = {};
    if (emisorId) where.emisorId = emisorId;
    if (receptorId) where.receptorId = receptorId;
    if (productoId) where.productoId = productoId;

    const mensajes = await Mensaje.findAll({ where, order: [['createdAt', 'ASC']] });
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Marcar mensaje como leído
exports.marcarLeido = async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    mensaje.leido = true;
    await mensaje.save();
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
