import { useEffect, useState } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

function MisPublicaciones() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/api/productos/mios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(res.data);
      setLoading(false);
    };
    fetchData();
  }, [token]);

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="mt-5">
      <h2>Mis Publicaciones</h2>
      {productos.length === 0 ? (
        <p>No tenés publicaciones aún.</p>
      ) : (
        productos.map(p => (
          <Card key={p.id} className="p-3 mb-3 shadow-sm">
            <h5>{p.titulo}</h5>
            <p>{p.descripcion}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
          </Card>
        ))
      )}
    </Container>
  );
}

export default MisPublicaciones;
