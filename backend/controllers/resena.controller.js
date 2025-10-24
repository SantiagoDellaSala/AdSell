const { Resena, Usuario, Producto } = require('../models');

// Obtener reseñas de un producto
exports.obtenerResenasProducto = async (req, res) => {
  try {
    const productoId = req.params.id;
    const resenas = await Resena.findAll({
      where: { productoId },
      include: [
        { model: Usuario, as: 'UsuarioQueCalifica', attributes: ['id', 'nombre'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(resenas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo cargar el producto con reseñas' });
  }
};

// Crear reseña de un producto
exports.crearResena = async (req, res) => {
  try {
    const productoId = req.params.id;
    const { comentario, puntaje } = req.body;
    const usuarioQueCalificaId = req.usuario.id; // 👈 corregido según tu middleware

    // Verificamos que el producto exista
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // usuarioCalificadoId = dueño del producto
    const usuarioCalificadoId = producto.usuarioId;

    // Creamos la reseña
    const nuevaResena = await Resena.create({
      comentario,
      puntaje,
      usuarioQueCalificaId,
      usuarioCalificadoId,
      productoId
    });

    // Incluimos datos del usuario que calificó
    const resenaConUsuario = await Resena.findByPk(nuevaResena.id, {
      include: [
        { model: Usuario, as: 'UsuarioQueCalifica', attributes: ['id', 'nombre'] }
      ]
    });

    res.status(201).json(resenaConUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo crear la reseña' });
  }
};
