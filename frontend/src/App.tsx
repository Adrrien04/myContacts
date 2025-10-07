
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from "./Pages/login.tsx";
import Register from "./Pages/register.tsx";
import Dashboard from "./Pages/dashboard.tsx";

function App() {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
