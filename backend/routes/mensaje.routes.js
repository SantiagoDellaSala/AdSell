// backend/routes/mensaje.routes.js
const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensaje.controller');

router.post('/', mensajeController.crearMensaje);
router.get('/', mensajeController.listarMensajes);
router.put('/leido/:id', mensajeController.marcarLeido);

module.exports = router;
