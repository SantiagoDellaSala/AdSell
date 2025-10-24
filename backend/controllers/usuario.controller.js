// backend/controllers/usuario.controller.js
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const upload = require('../config/multer');

// Crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, telefono, rol } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash, telefono, rol });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos los usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario logueado
exports.obtenerMiPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nombre', 'email', 'telefono', 'rol']
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario actual usando token
exports.obtenerUsuarioActual = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // viene del authMiddleware
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.subirVerificacion = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { telefono } = req.body;
    let fotoPerfil, dni;

    if (req.files) {
  if (req.files.fotoPerfil) fotoPerfil = 'uploads/' + req.files.fotoPerfil[0].filename;
  if (req.files.dni) dni = 'uploads/' + req.files.dni[0].filename;
}

    await usuario.update({
      telefono: telefono || usuario.telefono,
      fotoPerfil: fotoPerfil || usuario.fotoPerfil,
      dni: dni || usuario.dni,
      verificado: !!(fotoPerfil && dni)
    });

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo actualizar la verificación' });
  }
};

exports.editarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { nombre } = req.body;
    const nuevaFoto = req.file ? req.file.path : usuario.fotoPerfil;

    await usuario.update({
      nombre: nombre || usuario.nombre,
      fotoPerfil: nuevaFoto
    });

    res.json(usuario);
  } catch (error) {
    console.error('Error al editar perfil:', error);
    res.status(500).json({ error: 'No se pudo actualizar el perfil' });
  }
};
