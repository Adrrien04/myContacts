import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import * as api from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await api.login(formData);
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Email ou mot de passe incorrect.');
            console.error(err);
        }
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Card className="shadow-lg" style={{ width: '25rem' }}>
                <Card.Body className="p-5">
                    <Card.Title className="text-center mb-4">Connexion</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            Se connecter
                        </Button>
                    </Form>
                    <p className="mt-4 text-center">
                        Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
