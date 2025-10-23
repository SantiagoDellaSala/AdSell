const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resena.controller');

router.get('/producto/:id', resenaController.obtenerResenasProducto);
router.post('/producto/:id', resenaController.crearResena);

module.exports = router;
