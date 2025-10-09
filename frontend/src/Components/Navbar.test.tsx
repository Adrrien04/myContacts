import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomNavbar from "./Navbar";

describe('CustomNavbar Component', () => {
    const mockLogout = jest.fn();

    beforeEach(() => {
        mockLogout.mockClear();
        render(
            <MemoryRouter>
                <CustomNavbar onLogout={mockLogout} />
            </MemoryRouter>
        );
    });

    it("devrait afficher tous les éléments de la barre de navigation", () => {
        expect(screen.getByText(/Mes Contacts/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Accueil/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Déconnexion/i })).toBeInTheDocument();
    });

    it("devrait avoir des liens qui pointent vers /dashboard", () => {
        const brandLink = screen.getByText(/Mes Contacts/i).closest('a');
        const homeLink = screen.getByRole('link', { name: /Accueil/i });

        expect(brandLink).toHaveAttribute('href', '/dashboard');
        expect(homeLink).toHaveAttribute('href', '/dashboard');
    });

    it("devrait appeler la fonction onLogout au clic sur le bouton 'Déconnexion'", () => {
        const logoutButton = screen.getByRole('button', { name: /Déconnexion/i });
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
