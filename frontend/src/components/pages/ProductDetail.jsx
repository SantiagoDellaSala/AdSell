// frontend/src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Card,
  Form
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaEnvelope, FaStar } from 'react-icons/fa';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevoPuntaje, setNuevoPuntaje] = useState(5);

  const token = localStorage.getItem('token'); // Si el usuario está logueado

  useEffect(() => {
  const fetchProductoYResenas = async () => {
    try {
      const resProducto = await axios.get(`http://localhost:3000/api/productos/${id}`);
      setProducto(resProducto.data);
      setReseñas(resProducto.data.Resenas || []);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el producto o las reseñas.');
    } finally {
      setLoading(false);
    }
  };
  fetchProductoYResenas();
}, [id]);

  const handleAgregarResena = async (e) => {
    e.preventDefault();
    if (!token) return alert('Debes estar logueado para dejar una reseña.');

    try {
      const res = await axios.post(
        `http://localhost:3000/api/resenas/producto/${id}`,
        {
          comentario: nuevoComentario,
          puntaje: nuevoPuntaje
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReseñas([...reseñas, res.data]);
      setNuevoComentario('');
      setNuevoPuntaje(5);
    } catch (err) {
      console.error(err);
      alert('Error al agregar reseña');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4"
      >
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={producto.imagen || 'https://via.placeholder.com/400x300'}
                alt={producto.titulo}
              />
            </Card>
          </Col>

          <Col md={6}>
            <h2>{producto.titulo}</h2>
            <p className="text-muted">{producto.categoria}</p>
            <h4 className="text-success">${producto.precio}</h4>
            <p className="mt-3">{producto.descripcion}</p>

            <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2"
                onClick={() =>
                  alert('Pronto podrás contactar al vendedor directamente 😄')
                }
              >
                <FaEnvelope /> Contactar Vendedor
              </Button>
            </motion.div>

            {/* Reseñas */}
            <div className="mt-5">
              <h4>Reseñas</h4>
              {reseñas.length === 0 && <p>Aún no hay reseñas para este producto.</p>}
              {reseñas.map((r) => (
                <Card key={r.id} className="mb-2 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-1">
                      {Array.from({ length: r.puntaje }).map((_, i) => (
                        <FaStar key={i} className="text-warning me-1" />
                      ))}
                      <strong>{r.usuarioQueCalifica?.nombre || 'Anónimo'}</strong>
                    </div>
                    <p>{r.comentario}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {/* Formulario para nueva reseña */}
            {token && (
              <Form className="mt-4" onSubmit={handleAgregarResena}>
                <h5>Dejar una reseña</h5>
                <Form.Group className="mb-2">
                  <Form.Label>Puntaje</Form.Label>
                  <Form.Select
                    value={nuevoPuntaje}
                    onChange={(e) => setNuevoPuntaje(parseInt(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((p) => (
                      <option key={p} value={p}>
                        {p} ⭐
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="success">
                  Enviar reseña
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
}

export default ProductDetail;
