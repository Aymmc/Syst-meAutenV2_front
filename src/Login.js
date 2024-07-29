import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const MyComponent = () => {
    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { login, password } = credentials;
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message); // Affiche le message d'erreur du serveur
                return;
            }

            const data = await response.json();
            console.log('Réponse du serveur :', data);

            // Stocker le token dans les cookies avec options de sécurité
            Cookies.set('authToken', data.token, { 
                expires: 1, 
                secure: process.env.NODE_ENV === 'production', // Sécuriser le cookie en production
                sameSite: 'Strict' // Protéger contre les attaques CSRF
            });

            navigate('/lobby');
            window.location = document.location
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error.message);
            setErrorMessage('Erreur lors de la connexion au serveur'); // Affiche un message d'erreur générique
        }
    };

    return (
        <div className='login'>
            <h2>Connexion</h2>
            <h3>Connecte-toi pour continuer</h3>
            <form onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <label>Login:</label>
                <input type="text" name="login" value={login} onChange={handleInputChange} />

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handleInputChange} />

                <button type="submit">Connexion</button>
                <p>Vous n'avez pas de compte ? <Link to='/register'>Inscrivez-vous</Link></p>
            </form>
        </div>
    );
};

export default MyComponent;
