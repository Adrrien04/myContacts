import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CustomNavbarProps {
    onLogout: () => void;
}

const CustomNavbar = ({ onLogout }: CustomNavbarProps) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/dashboard">
                    Mes Contacts
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Accueil</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" onClick={onLogout}>
                        Déconnexion
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
