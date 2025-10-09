import { render, screen, fireEvent, within } from '@testing-library/react';
import ContactList from './ContactList';
import type { IContact } from "../type";

const mockContacts: IContact[] = [
    {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+33612345678',
        address: '123 Rue de Paris'
    },
    {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        phone: '+33787654321',
        address: ''
    }
];

describe('ContactList Component', () => {
    const mockDelete = jest.fn();
    const mockEdit = jest.fn();

    beforeEach(() => {
        mockDelete.mockClear();
        mockEdit.mockClear();
    });

    it("devrait afficher un message si la liste des contacts est vide", () => {
        render(<ContactList contacts={[]} onDeleteContact={mockDelete} onEditContact={mockEdit} />);
        expect(screen.getByText("Vous n'avez aucun contact pour le moment.")).toBeInTheDocument();
    });

    it("devrait afficher tous les contacts et leurs informations", () => {
        render(<ContactList contacts={mockContacts} onDeleteContact={mockDelete} onEditContact={mockEdit} />);

        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText('john.doe@email.com')).toBeInTheDocument();
        expect(screen.getByText('123 Rue de Paris')).toBeInTheDocument();

        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.getByText('jane.smith@email.com')).toBeInTheDocument();

        expect(screen.queryByText("Vous n'avez aucun contact pour le moment.")).not.toBeInTheDocument();
    });

    it("devrait appeler onEditContact avec les bonnes données au clic sur 'Modifier'", () => {
        render(<ContactList contacts={mockContacts} onDeleteContact={mockDelete} onEditContact={mockEdit} />);

        const johnsCard = screen.getByTestId('1');
        const editButton = within(johnsCard).getByRole('button', { name: /modifier/i });
        fireEvent.click(editButton);

        expect(mockEdit).toHaveBeenCalledTimes(1);
        expect(mockEdit).toHaveBeenCalledWith(mockContacts[0]);
    });

    it("devrait appeler onDeleteContact avec le bon ID au clic sur 'Supprimer'", () => {
        render(<ContactList contacts={mockContacts} onDeleteContact={mockDelete} onEditContact={mockEdit} />);

        const janesCard = screen.getByTestId('2');
        const deleteButton = within(janesCard).getByRole('button', { name: /supprimer/i });
        fireEvent.click(deleteButton);

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(mockContacts[1]._id);
    });
});
