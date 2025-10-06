import type { IContact } from "../type";


interface ContactListProps {
    contacts: IContact[];
    onDeleteContact: (id: string) => void;
}

const ContactList = ({ contacts, onDeleteContact }: ContactListProps) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title mb-4">Liste des contacts</h3>
                {contacts.length === 0 ? (
                    <p className="text-muted">Vous n'avez aucun contact pour le moment.</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {contacts.map((contact) => (
                            <li key={contact._id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{contact.firstName} {contact.lastName}</div>
                                    <small className="d-block text-muted">{contact.email}</small>
                                    <small className="d-block text-muted">{contact.phone}</small>
                                    {contact.address && <small className="d-block text-muted">{contact.address}</small>}
                                </div>
                                <button onClick={() => onDeleteContact(contact._id)} className="btn btn-outline-danger btn-sm">
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ContactList;
