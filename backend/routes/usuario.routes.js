const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multer');

// 🔹 Editar perfil del usuario autenticado (debe ir antes de rutas con /:id)
router.put(
  '/editar',
  authMiddleware,
  upload.single('fotoPerfil'),
  usuarioController.editarPerfil
);

// 🔹 Verificación de usuario (subida de DNI y foto)
router.put(
  '/verificacion',
  authMiddleware,
  upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'dni', maxCount: 1 }
  ]),
  usuarioController.subirVerificacion
);

// CRUD y obtención de usuarios
router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.listarUsuarios);
router.get('/me', authMiddleware, usuarioController.obtenerUsuarioActual);
router.get('/:id', usuarioController.obtenerUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
