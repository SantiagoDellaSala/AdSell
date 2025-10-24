import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/pages/Dashboard';
import ProductDetail from './components/pages/ProductDetail';
import Perfil from './components/pages/Perfil';
import EditarPerfil from './components/pages/EditarPerfil';
import MisPublicaciones from './components/pages/MisPublicaciones';
import PublicarProducto from './components/pages/PublicarProducto';
import './App.css'; // asegurate de importar tu CSS global

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
            <Route path="/publicar" element={<PublicarProducto />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
