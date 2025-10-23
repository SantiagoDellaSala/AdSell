// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from "../Products/ProductCard";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [productoForm, setProductoForm] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    categoria: '',
    estado: 'activo',
  });
  const [mensaje, setMensaje] = useState({ type: '', text: '' });

  const token = localStorage.getItem('token');

  // Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/productos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(res.data);
      } catch (err) {
        console.error(err);
        setMensaje({ type: 'danger', text: 'Error al cargar productos' });
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [token]);

  const handleChange = (e) => {
    setProductoForm({ ...productoForm, [e.target.name]: e.target.value });
  };

  // Crear o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Editar
        const res = await axios.put(`http://localhost:3000/api/productos/${editing}`, productoForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(productos.map(p => (p.id === editing ? res.data : p)));
        setMensaje({ type: 'success', text: 'Producto actualizado con éxito' });
      } else {
        // Crear nuevo
        const res = await axios.post('http://localhost:3000/api/productos', productoForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos([...productos, res.data]);
        setMensaje({ type: 'success', text: 'Producto creado correctamente' });
      }
      setShowModal(false);
      setProductoForm({ titulo: '', descripcion: '', precio: '', categoria: '', estado: 'activo' });
      setEditing(null);
    } catch (err) {
      setMensaje({ type: 'danger', text: err.response?.data?.error || 'Error al guardar producto' });
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(productos.filter(p => p.id !== id));
      setMensaje({ type: 'success', text: 'Producto eliminado correctamente' });
    } catch (err) {
      setMensaje({ type: 'danger', text: 'Error al eliminar producto' });
    }
  };

  // Abrir modal en modo edición
  const handleEdit = (producto) => {
    setEditing(producto.id);
    setProductoForm({
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      estado: producto.estado,
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Productos</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus /> Nuevo Producto
        </Button>
      </div>

      {mensaje.text && <Alert variant={mensaje.type}>{mensaje.text}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        <AnimatePresence>
          {productos.map(prod => (
            <Col key={prod.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="position-relative">
                  <ProductCard producto={prod} />
                  <div className="position-absolute top-0 end-0 p-2 d-flex flex-column">
                    <Button
                      variant="warning"
                      size="sm"
                      className="mb-2"
                      onClick={() => handleEdit(prod)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(prod.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </AnimatePresence>
      </Row>

      {/* Modal crear/editar */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setEditing(null); }}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" name="titulo" value={productoForm.titulo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={productoForm.descripcion} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" step="0.01" name="precio" value={productoForm.precio} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" name="categoria" value={productoForm.categoria} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editing ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Dashboard;
