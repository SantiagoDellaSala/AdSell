import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    const fetchPerfil = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/usuarios/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, [token]);

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="text-center mt-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-5">
      <h2>Mi Perfil</h2>
      <Card className="p-3 shadow-sm">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono || '-'}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </Card>
    </Container>
  );
}

export default Perfil;
