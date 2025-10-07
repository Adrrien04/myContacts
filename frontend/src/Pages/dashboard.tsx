import { useState, useEffect } from 'react';
import * as api from '../api';
import type {IContact, NewContact} from "../type.ts";
import ContactForm from "../Components/ContactForm.tsx";
import ContactList from "../Components/ContactList.tsx";

const Dashboard = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);

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
            loadContacts();
        } catch (error) {
            console.error("Erreur lors de l'ajout du contact:", error);
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container mt-5">
            <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h1>Mes Contacts</h1>
                <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
            </header>
            <main>
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <ContactForm onAddContact={handleAddContact} />
                    </div>
                    <div className="col-lg-8">
                        <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
