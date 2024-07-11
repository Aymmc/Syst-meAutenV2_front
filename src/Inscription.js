import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const MyComponent = () => {
    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation
    const { login, password } = credentials;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        return password.length >= minLength && specialCharRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validatePassword(password)) {
            setError('Le mot de passe doit contenir au moins 8 caractères et au moins un caractère spécial.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors de la requête au serveur');
            } else {
                setSuccess('Inscription réussie !');
                // Réinitialiser les champs du formulaire après le succès de l'inscription
                setCredentials({ login: '', password: '' });
                navigate('/login'); // Remplacez '/home' par la route vers laquelle vous voulez naviguer
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error.message);
            setError('Erreur lors de l\'envoi des données');
        }
    };

    return (
        <>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
            <label>Login:</label>
            <input type="text" name="login" value={login} onChange={handleInputChange} />

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handleInputChange} />

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <button type="submit">Envoyer</button>
        </form>
        </>
    );
};

export default MyComponent;
