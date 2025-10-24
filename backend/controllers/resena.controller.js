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

// Crear o actualizar reseña de un producto
exports.crearOActualizarResena = async (req, res) => {
  try {
    const productoId = req.params.id;
    const { comentario, puntaje } = req.body;
    const usuarioQueCalificaId = req.usuario.id;

    // Verificamos que el producto exista
    const producto = await Producto.findByPk(productoId);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const usuarioCalificadoId = producto.usuarioId;

    // Buscamos si el usuario ya tiene una reseña para este producto
    let reseña = await Resena.findOne({
      where: { productoId, usuarioQueCalificaId }
    });

    if (reseña) {
      // Actualizamos la reseña existente
      await reseña.update({ comentario, puntaje });
    } else {
      // Creamos nueva reseña
      reseña = await Resena.create({
        comentario,
        puntaje,
        usuarioQueCalificaId,
        usuarioCalificadoId,
        productoId
      });
    }

    // Incluimos datos del usuario que calificó
    const resenaConUsuario = await Resena.findByPk(reseña.id, {
      include: [
        { model: Usuario, as: 'UsuarioQueCalifica', attributes: ['id', 'nombre'] }
      ]
    });

    res.status(201).json(resenaConUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo crear o actualizar la reseña' });
  }
};

// Editar reseña existente
exports.editarResena = async (req, res) => {
  try {
    const resenaId = req.params.id;
    const { comentario, puntaje } = req.body;
    const usuarioId = req.usuario.id;

    // Buscar la reseña
    const resena = await Resena.findByPk(resenaId);
    if (!resena) return res.status(404).json({ error: 'Reseña no encontrada' });

    // Solo puede editar quien la creó
    if (resena.usuarioQueCalificaId !== usuarioId) {
      return res.status(403).json({ error: 'No tienes permiso para editar esta reseña' });
    }

    // Actualizar
    resena.comentario = comentario;
    resena.puntaje = puntaje;
    await resena.save();

    // Devolver con datos del usuario
    const resenaActualizada = await Resena.findByPk(resena.id, {
      include: [{ model: Usuario, as: 'UsuarioQueCalifica', attributes: ['id', 'nombre'] }]
    });

    res.json(resenaActualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo actualizar la reseña' });
  }
};
