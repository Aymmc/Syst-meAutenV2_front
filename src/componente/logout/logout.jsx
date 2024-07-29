import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Friend from '../../pages/friend/friend';
const LogoutButton = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifier si le token est présent dans les cookies
        const token = Cookies.get('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        // Supprimer le token des cookies
        Cookies.remove('authToken');
        
        // Mettre à jour l'état de l'authentification
        setIsAuthenticated(false);

        // Rediriger vers la page de connexion
        navigate('/');
    };

    return (
        isAuthenticated && (
            <>
                <button onClick={handleLogout}>Déconnexion</button>
                <Friend/>
                </>
        )
    );
};

export default LogoutButton;
