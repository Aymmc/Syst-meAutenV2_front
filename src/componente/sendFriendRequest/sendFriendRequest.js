import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Importez js-cookie

const SendFriendRequest = () => {
    const [receiverLogin, setReceiverLogin] = useState('');
    const [message, setMessage] = useState('');

    const handleSendRequest = async () => {
        console.log(receiverLogin);
        try {
            const response = await fetch('http://localhost:5000/friendship/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}` // Utilisez les cookies pour obtenir le token
                },
                body: JSON.stringify({ receiverLogin })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de l’envoi de la demande.');
            }

            setMessage('Demande d’amitié envoyée.');
        } catch (error) {
            console.error('Erreur lors de l’envoi de la demande', error);
            setMessage(error.message || 'Erreur lors de l’envoi de la demande.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={receiverLogin}
                onChange={(e) => setReceiverLogin(e.target.value)}
                placeholder="Login de l'ami"
            />
            <button onClick={handleSendRequest}>Envoyer une demande</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SendFriendRequest;
    