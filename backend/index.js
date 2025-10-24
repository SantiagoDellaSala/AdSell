const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173' // solo desde tu frontend
}));

// Rutas
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const productoRoutes = require('./routes/producto.routes');
const mensajeRoutes = require('./routes/mensaje.routes');
const resenaRoutes = require('./routes/resena.routes');
const publicacionRoutes = require('./routes/publicacion.routes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/resenas', resenaRoutes);
app.use('/api/publicaciones', publicacionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

