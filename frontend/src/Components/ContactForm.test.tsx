import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "./ContactForm";


describe("ContactForm Component", () => {
    it("should render all form fields", () => {
        render(<ContactForm />);
        expect(screen.getByPlaceholderText(/Prénom/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/Nom/i)[0]).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ajouter/i })).toBeInTheDocument();
    });

    it("should show validation errors when submitting empty form", async () => {
        render(<ContactForm />);
        fireEvent.click(screen.getByRole("button", { name: /ajouter/i }));

        expect(await screen.findByText("Le prénom est requis.")).toBeInTheDocument();
        expect(await screen.findByText("Le nom est requis.")).toBeInTheDocument();
        expect(await screen.findByText("Le numéro de téléphone est requis.")).toBeInTheDocument();
    });

    it("should call onAddContact with correct data", async () => {
        const mockAdd = jest.fn().mockResolvedValue(undefined);
        render(<ContactForm onAddContact={mockAdd} />);

        fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: "John" } });
        fireEvent.change(screen.getAllByPlaceholderText(/Nom/i)[0], { target: { value: "Doe" } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "john@doe.com" } });
        fireEvent.change(
            screen.getByPlaceholderText("1 (702) 123-4567"),
            { target: { value: "+33123456789" } }
        );


        fireEvent.click(screen.getByRole("button", { name: /ajouter/i }));

        await waitFor(() => {
            expect(mockAdd).toHaveBeenCalledWith({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com",
                phone: "+33612345678",
                address: "",
            });
        });
    });


});

