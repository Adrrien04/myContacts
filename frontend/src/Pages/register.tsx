import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            await api.register(formData);
            navigate('/login');
        } catch (err) {
            setError('Une erreur est survenue. Cet email est peut-être déjà utilisé.');
            console.error(err);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg" style={{ width: '25rem' }}>
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4">Inscription</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control" placeholder="Nom complet" required onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <input type="password" name="password" className="form-control" placeholder="Mot de passe" required onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
                    </form>
                    <p className="mt-4 text-center">
                        Déjà un compte ? <Link to="/login">Connectez-vous</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
