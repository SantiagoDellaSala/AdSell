// frontend/src/components/Layout/Footer.jsx
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-4">
      <Container>
        &copy; {new Date().getFullYear()} AdSell. Todos los derechos reservados.
      </Container>
    </footer>
  );
}

export default Footer;
