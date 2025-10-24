import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/pages/Dashboard';
import ProductDetail from './components/pages/ProductDetail';
import Perfil from './components/pages/Perfil'; // 👈 importamos Perfil

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/perfil" element={<Perfil />} /> {/* 👈 ruta de perfil */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
