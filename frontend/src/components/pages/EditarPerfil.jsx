import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function EditarPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/usuarios/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
        setNombre(res.data.nombre);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      }
    };
    fetchData();
  }, [token]);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      if (fotoPerfil) formData.append('fotoPerfil', fotoPerfil);

      const res = await axios.put(
        'http://localhost:3000/api/usuarios/editar',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUsuario(res.data);
      setMensaje('Perfil actualizado correctamente ✅');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setMensaje('Error al actualizar el perfil ❌');
    } finally {
      setLoading(false);
    }
  };

  if (!usuario)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2>Editar Perfil</h2>
      <Form onSubmit={handleGuardar}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Foto de perfil</Form.Label>
          <Form.Control
            type="file"
            accept="image/*" // ✅ solo imágenes
            onChange={(e) => setFotoPerfil(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="success" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Guardar cambios'}
        </Button>
      </Form>

      {mensaje && <Alert variant="info" className="mt-3">{mensaje}</Alert>}
    </Container>
  );
}

export default EditarPerfil;
