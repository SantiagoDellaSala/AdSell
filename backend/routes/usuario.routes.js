const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // 👈 requerimos auth
const upload = require('../config/multer');

router.put(
  '/verificacion',
  authMiddleware,
  upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'dni', maxCount: 1 }
  ]),
  usuarioController.subirVerificacion
);

router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.listarUsuarios);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

// NUEVO: obtener usuario actual
router.get('/me', authMiddleware, usuarioController.obtenerUsuarioActual);

// Obtener usuario por ID
router.get('/:id', usuarioController.obtenerUsuario);


module.exports = router;
