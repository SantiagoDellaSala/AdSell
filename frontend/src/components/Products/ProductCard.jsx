// frontend/src/components/Products/ProductCard.jsx
import { Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ProductCard({ producto }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mb-4"
    >
      <Card style={{ width: '18rem' }} className="h-100 shadow-sm">
        <Card.Img variant="top" src={producto.imagen || 'https://via.placeholder.com/150'} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.titulo}</Card.Title>
          <Card.Text className="flex-grow-1">
            {producto.descripcion.length > 60 
              ? producto.descripcion.slice(0, 60) + '...' 
              : producto.descripcion
            }
          </Card.Text>
          <h5 className="text-success">${producto.precio}</h5>
          <Button variant="primary" className="mt-2" onClick={() => navigate(`/producto/${producto.id}`)}>
            Ver Detalle
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
