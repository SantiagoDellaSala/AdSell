import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function PublicarProducto() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');

  const handlePublicar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    if (imagen) formData.append('imagen', imagen);

    await axios.post('http://localhost:3000/api/productos', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setMensaje('Producto publicado correctamente ✅');
    setTitulo('');
    setDescripcion('');
    setPrecio('');
    setImagen(null);
  };

  return (
    <Container className="mt-5">
      <h2>Publicar Producto</h2>
      <Form onSubmit={handlePublicar}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" value={precio} onChange={e => setPrecio(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" onChange={e => setImagen(e.target.files[0])} />
        </Form.Group>
        <Button type="submit" variant="success">Publicar</Button>
      </Form>
      {mensaje && <Alert variant="info" className="mt-3">{mensaje}</Alert>}
    </Container>
  );
}

export default PublicarProducto;
