const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resena.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/producto/:id', resenaController.obtenerResenasProducto);
router.post('/producto/:id', authMiddleware, resenaController.crearOActualizarResena);
router.put('/:id', authMiddleware, resenaController.editarResena);

module.exports = router;
