import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import type { NewContact, IContact } from "../type.ts";

interface ContactFormProps {
    onAddContact?: (contactData: NewContact) => Promise<void>;
    onEditContact?: (contactData: Partial<NewContact>) => Promise<void>;
    initialData?: Partial<IContact>;
}

const ContactForm = ({ onAddContact, onEditContact, initialData }: ContactFormProps) => {
    const [formData, setFormData] = useState<NewContact>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                address: initialData.address || ''
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (value: string) => {
        setFormData({ ...formData, phone: value });
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
        if (!validateForm()) return;

        const formattedData = {
            ...formData,
            phone: formData.phone.startsWith('+') ? formData.phone : `+${formData.phone}`,
        };

        try {
            if (onEditContact) {
                await onEditContact(formattedData);
            } else if (onAddContact) {
                await onAddContact(formattedData);
                setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '' });
            }
            setErrors({});
        } catch (err: any) {
            setErrors({ general: err.message || "Erreur serveur inconnue." });
        }
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Nom"
                            value={formData.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <PhoneInput
                            country="fr"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputStyle={{ width: '100%' }}
                        />
                        {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                    </Form.Group>


                    {errors.general && (
                        <div className="alert alert-danger py-2">{errors.general}</div>
                    )}

                    <Button type="submit" variant="success" className="w-100">
                        {onEditContact ? "Mettre à jour" : "Ajouter"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ContactForm;
