import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg" style={{ width: '25rem' }}>
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4">Connexion</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <input type="password" name="password" className="form-control" placeholder="Mot de passe" required onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                    </form>
                    <p className="mt-4 text-center">
                        Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
