import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import * as api from '../api';
import type { IContact, NewContact } from "../type.ts";
import ContactForm from "../Components/ContactForm.tsx";
import ContactList from "../Components/ContactList.tsx";

const Dashboard = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [showModal, setShowModal] = useState(false);

    const loadContacts = async () => {
        try {
            const { data } = await api.fetchContacts();
            setContacts(data.contacts);
        } catch (error) {
            console.error("Erreur lors du chargement des contacts:", error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const handleAddContact = async (contactData: NewContact) => {
        try {
            await api.createContact(contactData);
            await loadContacts();
            setShowModal(false);
        } catch (error: any) {
            console.error("Erreur lors de l'ajout du contact:", error);
            const message =
                error?.response?.data?.message ||
                "Une erreur est survenue lors de l'ajout du contact.";
            throw new Error(message);
        }
    };


    const handleDeleteContact = async (id: string) => {
        try {
            await api.deleteContact(id);
            loadContacts();
        } catch (error) {
            console.error("Erreur lors de la suppression du contact:", error);
        }
    };




    return (
        <Container fluid className="min-vh-100 d-flex flex-column px-4">
            <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h1 className="display-5">Mes Contacts</h1>
            </header>

            <main className="flex-grow-1">
                <Row className="justify-content-end mb-4">
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => setShowModal(true)}>
                            Ajouter un contact
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
                    </Col>
                </Row>
            </main>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm onAddContact={handleAddContact} />
                </Modal.Body>
            </Modal>
        </Container>
    );

};

export default Dashboard;
