import { Card, Button, Row, Col } from 'react-bootstrap';
import type { IContact } from "../type";

interface ContactListProps {
    contacts: IContact[];
    onDeleteContact: (id: string) => void;
    onEditContact: (contact: IContact) => void;
}

const ContactList = ({ contacts, onDeleteContact, onEditContact }: ContactListProps) => {
    return (
        <div>
            <h3 className="mb-4">Liste des contacts</h3>
            {contacts.length === 0 ? (
                <p className="text-muted">Vous n'avez aucun contact pour le moment.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {contacts.map((contact) => (
                        <Col key={contact._id} data-testid={contact._id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>
                                        {contact.firstName} {contact.lastName}
                                    </Card.Title>
                                    <Card.Text>
                                        <small className="text-muted d-block">{contact.email}</small>
                                        <small className="text-muted d-block">{contact.phone}</small>
                                        {contact.address && (
                                            <small className="text-muted d-block">
                                                {contact.address}
                                            </small>
                                        )}
                                    </Card.Text>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => onEditContact(contact)}
                                        >
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => onDeleteContact(contact._id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ContactList;
