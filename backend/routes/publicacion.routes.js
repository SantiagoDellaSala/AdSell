// backend/routes/publicacion.routes.js
const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacion.controller');

router.post('/', publicacionController.crearPublicacion);
router.get('/', publicacionController.listarPublicaciones);
router.put('/:id', publicacionController.actualizarEstado);

module.exports = router;
