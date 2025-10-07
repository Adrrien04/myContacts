import { Routes, Route, Navigate } from 'react-router-dom';
import {Container } from 'react-bootstrap';
import Login from "./Pages/login.tsx";
import Register from "./Pages/register.tsx";
import Dashboard from "./Pages/dashboard.tsx";
import CustomNavbar from "./Components/Navbar";

function App() {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <>
            {token && <CustomNavbar onLogout={handleLogout} />}
            <Container fluid>
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
