import { useState, useEffect } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import ProductCard from './ProductCard';
import axios from 'axios';

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/productos'); // <-- sin token
        setProductos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productos.map(prod => (
          <Col key={prod.id}>
            <ProductCard producto={prod} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
