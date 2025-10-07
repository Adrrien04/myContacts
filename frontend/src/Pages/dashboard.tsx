import { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Collapse,
    Form,
    InputGroup,
    Spinner,
    Fade,
    Alert,
} from "react-bootstrap";
import * as api from "../api";
import type { IContact, NewContact } from "../type.ts";
import ContactForm from "../Components/ContactForm.tsx";
import ContactList from "../Components/ContactList.tsx";

const Dashboard = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState<IContact | null>(null);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const loadContacts = async () => {
        try {
            setLoading(true);
            const { data } = await api.fetchContacts();
            setContacts(data.contacts);
            setFilteredContacts(data.contacts);
        } catch (error) {
            console.error("Erreur lors du chargement des contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) {
            setFilteredContacts(contacts);
        } else {
            setFilteredContacts(
                contacts.filter(
                    (c) =>
                        c.firstName.toLowerCase().includes(term) ||
                        c.lastName.toLowerCase().includes(term) ||
                        c.phone.includes(term)
                )
            );
        }
    }, [searchTerm, contacts]);


    const showTempAlert = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(null), 3000);
    };

    const handleAddContact = async (contactData: NewContact) => {
        try {
            setActionLoading(true);
            await api.createContact(contactData);
            await loadContacts();
            setShowModal(false);
            showTempAlert("Contact ajouté avec succès !");
        } catch (error: any) {
            showTempAlert("Erreur lors de l'ajout du contact.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteContact = async (id: string) => {
        try {
            setActionLoading(true);
            await api.deleteContact(id);
            await loadContacts();
            showTempAlert("Contact supprimé !");
        } catch (error) {
            showTempAlert("Erreur lors de la suppression du contact.");
        } finally {
            setActionLoading(false);
        }
    };

    const handlePatchContact = async (
        id: string,
        updatedData: Partial<NewContact>
    ) => {
        try {
            setActionLoading(true);
            await api.patchContact(id, updatedData);
            await loadContacts();
            setShowModal(false);
            setEditingContact(null);
            showTempAlert("Contact mis à jour !");
        } catch (error: any) {
            showTempAlert("Erreur lors de la mise à jour.");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex flex-column px-4 position-relative">
            <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h1 className="display-5">Mes Contacts</h1>
            </header>

            <Fade in={!!alertMessage}>
                <div
                    className="position-fixed top-0 end-0 p-3"
                    style={{ zIndex: 2000, width: "auto" }}
                >
                    {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
                </div>
            </Fade>

            <main className="flex-grow-1">
                <Row className="justify-content-between align-items-center mb-3">
                    <Col xs="auto">
                        <Button
                            variant="secondary"
                            onClick={() => setShowFilters(!showFilters)}
                            aria-controls="filters-collapse"
                            aria-expanded={showFilters}
                        >
                            {showFilters ? "Masquer les filtres" : "Filtres"}
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            onClick={() => {
                                setModalMode("add");
                                setEditingContact(null);
                                setShowModal(true);
                            }}
                            disabled={actionLoading}
                        >
                            {actionLoading ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Chargement...
                                </>
                            ) : (
                                "Ajouter un contact"
                            )}
                        </Button>
                    </Col>
                </Row>

                <Collapse in={showFilters}>
                    <div id="filters-collapse" className="mb-4 transition-all">
                        <Row>
                            <Col md={6} lg={4}>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Rechercher par nom, prénom ou numéro"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        ✕
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                </Collapse>

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <Spinner animation="border" role="status" />
                        <span className="ms-2">Chargement des contacts...</span>
                    </div>
                ) : (
                    <Row>
                        <Col>
                            <ContactList
                                contacts={filteredContacts}
                                onDeleteContact={handleDeleteContact}
                                onEditContact={(contact) => {
                                    setModalMode("edit");
                                    setEditingContact(contact);
                                    setShowModal(true);
                                }}
                            />
                        </Col>
                    </Row>
                )}
            </main>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "add"
                            ? "Ajouter un contact"
                            : "Modifier le contact"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actionLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" />
                            <div className="mt-2">Traitement en cours...</div>
                        </div>
                    ) : (
                        <ContactForm
                            onAddContact={modalMode === "add" ? handleAddContact : undefined}
                            onEditContact={
                                modalMode === "edit"
                                    ? (data) =>
                                        editingContact
                                            ? handlePatchContact(editingContact._id, data)
                                            : Promise.resolve()
                                    : undefined
                            }
                            initialData={editingContact || undefined}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;
