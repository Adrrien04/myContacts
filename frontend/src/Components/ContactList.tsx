import { Card, Button, Row, Col } from 'react-bootstrap';
import type { IContact } from "../type";

interface ContactListProps {
    contacts: IContact[];
    onDeleteContact: (id: string) => void;
}

const ContactList = ({ contacts, onDeleteContact }: ContactListProps) => {
    return (
        <div>
            <h3 className="mb-4">Liste des contacts</h3>
            {contacts.length === 0 ? (
                <p className="text-muted">Vous n'avez aucun contact pour le moment.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {contacts.map((contact) => (
                        <Col key={contact._id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
                                    <Card.Text>
                                        <small className="text-muted d-block">{contact.email}</small>
                                        <small className="text-muted d-block">{contact.phone}</small>
                                        {contact.address && <small className="text-muted d-block">{contact.address}</small>}
                                    </Card.Text>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onDeleteContact(contact._id)}
                                    >
                                        Supprimer
                                    </Button>
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
