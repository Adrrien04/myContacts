import React, { useState } from 'react';
import type {NewContact} from "../type.ts";

interface ContactFormProps {
    onAddContact: (contactData: NewContact) => void;
}

const initialState: NewContact = { firstName: '', lastName: '', email: '', phone: '', address: '' };

const ContactForm = ({ onAddContact }: ContactFormProps) => {
    const [formData, setFormData] = useState<NewContact>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddContact(formData);
        setFormData(initialState);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title mb-4">Ajouter un contact</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="form-control" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
