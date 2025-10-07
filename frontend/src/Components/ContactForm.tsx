import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import type { NewContact } from "../type.ts";

interface ContactFormProps {
    onAddContact: (contactData: NewContact) => Promise<void>;
}

const initialState: NewContact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
};

const ContactForm = ({ onAddContact }: ContactFormProps) => {
    const [formData, setFormData] = useState<NewContact>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (value: string) => {
        setFormData({ ...formData, phone: value });
        if (!value || value.length < 6) {
            setErrors((prev) => ({ ...prev, phone: "Le numéro de téléphone est invalide." }));
        } else {
            setErrors((prev) => ({ ...prev, phone: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis.";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis.";
        if (!formData.phone.trim()) newErrors.phone = "Le numéro de téléphone est requis.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            const formattedData = {
                ...formData,
                phone: formData.phone.startsWith('+') ? formData.phone : `+${formData.phone}`,
            };

            try {
                await onAddContact(formattedData);
                setFormData(initialState);
                setErrors({});
            } catch (err: any) {
                const message = err.message || "Erreur serveur inconnue.";
                setErrors({ general: message });
            }
        }
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Nom"
                            value={formData.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <PhoneInput
                            country="fr"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputStyle={{ width: '100%' }}
                            specialLabel="Téléphone"
                            inputProps={{ required: true }}
                        />
                        {errors.phone && (
                            <div className="invalid-feedback d-block">{errors.phone}</div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Adresse"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {errors.general && (
                        <div className="alert alert-danger py-2" role="alert">
                            {errors.general}
                        </div>
                    )}

                    <Button type="submit" variant="success" className="w-100">
                        Ajouter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ContactForm;
