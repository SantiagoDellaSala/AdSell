// backend/controllers/producto.controller.js
const { Producto } = require('../models');

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos los productos
exports.listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID (con reseñas y usuarios)
exports.obtenerProducto = async (req, res) => {
  try {
    const { Producto, Resena, Usuario } = require('../models');

    console.log("Buscando producto con ID:", req.params.id);

    const producto = await Producto.findByPk(req.params.id, {
      include: [
        {
          model: Resena,
          include: [
            { model: Usuario, as: 'UsuarioQueCalifica', attributes: ['id', 'nombre'] },
            { model: Usuario, as: 'UsuarioCalificado', attributes: ['id', 'nombre'] }
          ]
        }
      ]
    });

    if (!producto) {
      console.log("No se encontró el producto en la base de datos.");
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: error.message });
  }
};


// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
