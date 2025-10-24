import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [dni, setDni] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const fetchPerfil = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/usuarios/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuario(res.data);
                setTelefono(res.data.telefono || '');
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar el perfil.');
            } finally {
                setLoading(false);
            }
        };
        fetchPerfil();
    }, [token]);

    const handleSubirVerificacion = async (e) => {
        e.preventDefault();
        if (!token) return;

        try {
            const formData = new FormData();
            formData.append('telefono', telefono);
            if (fotoPerfil) formData.append('fotoPerfil', fotoPerfil);
            if (dni) formData.append('dni', dni);

            const res = await axios.put('http://localhost:3000/api/usuarios/verificacion', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUsuario(res.data);
            setMensaje('Datos de verificación enviados correctamente ✅');
            setTimeout(() => setMensaje(''), 3000);
        } catch (err) {
            console.error(err);
            setMensaje('Error al subir verificación ❌');
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
    if (error) return <Container className="text-center mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-5">
            <h2>Mi Perfil {usuario.verificado && '✅'}</h2>
            <Card className="p-3 shadow-sm mb-4">
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono || '-'}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
                <p><strong>Verificado:</strong> {usuario.verificado ? 'Sí ✅' : 'No ❌'}</p>
                {usuario.fotoPerfil && (
                    <img src={`http://localhost:3000/${usuario.fotoPerfil}`} alt="Foto Perfil" style={{ width: 100 }} />
                )}

                {usuario.dni && <p>DNI cargado</p>}
            </Card>

            {!usuario.verificado && (
                <Form onSubmit={handleSubirVerificacion}>
                    <h5>Subir documentos para verificación</h5>
                    <Form.Group className="mb-2">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="text" value={telefono} onChange={e => setTelefono(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Foto de perfil</Form.Label>
                        <Form.Control type="file" onChange={e => setFotoPerfil(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type="file" onChange={e => setDni(e.target.files[0])} />
                    </Form.Group>
                    <Button type="submit" variant="success">Enviar verificación</Button>
                </Form>
            )}

            {mensaje && <Alert variant="info" className="mt-3">{mensaje}</Alert>}
        </Container>
    );
}

export default Perfil;
