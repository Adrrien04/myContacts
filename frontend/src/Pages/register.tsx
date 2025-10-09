import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Spinner } from 'react-bootstrap';
import * as api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [slowConnection, setSlowConnection] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setSlowConnection(false);

        const timer = setTimeout(() => {
            setSlowConnection(true);
        }, 4000);

        try {
            await api.register(formData);
            navigate('/login');
        } catch (err) {
            setError('Une erreur est survenue. Cet email est peut-être déjà utilisé.');
            console.error(err);
        } finally {
            clearTimeout(timer);
            setLoading(false);
            setSlowConnection(false);
        }
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Card className="shadow-lg" style={{ width: '25rem' }}>
                <Card.Body className="p-5">
                    <Card.Title as="h2" className="text-center mb-4">Inscription</Card.Title>

                    {error && <Alert variant="danger">{error}</Alert>}

                    {slowConnection && (
                        <Alert variant="warning" className="text-center small">
                            L'opération prend plus de temps que prévu. L'api render est peut-être en train de démarrer, veuillez patienter...
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nom complet"
                                required
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Inscription...
                                </>
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>
                    </Form>
                    <p className="mt-4 text-center">
                        Déjà un compte ? <Link to="/login">Connectez-vous</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
