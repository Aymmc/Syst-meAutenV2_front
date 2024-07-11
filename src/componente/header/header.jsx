import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './header.css'
const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer le token des cookies
        Cookies.remove('authToken');
        
        // Rediriger vers la page de connexion
        navigate('/');
    };

    return (
        <header>
        <button onClick={handleLogout}>Déconnexion</button>
            </header>
    );
};

export default LogoutButton;
