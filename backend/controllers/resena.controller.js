const { Resena, Usuario } = require('../models');

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

exports.crearResena = async (req, res) => {
  try {
    const productoId = req.params.id;
    const { comentario, puntaje } = req.body;
    const usuarioQueCalificaId = req.user.id; // obtenido del token

    const nuevaResena = await Resena.create({
      comentario,
      puntaje,
      usuarioQueCalificaId,
      usuarioCalificadoId: req.body.usuarioCalificadoId, // o lo calculás según el producto
      productoId
    });

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
