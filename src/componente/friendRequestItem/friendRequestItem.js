import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Assurez-vous que js-cookie est installé



const FriendRequestItem = ({ request }) => {
    const handleAccept = async () => {
        try {
            const response = await fetch('http://localhost:5000/friendship/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`, // Utilisez les cookies pour obtenir le token
                },
                body: JSON.stringify({ requestId: request.id }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l’acceptation de la demande.');
            }

            window.location.reload(); // Recharger pour mettre à jour la liste
        } catch (error) {
            console.error('Erreur lors de l’acceptation de la demande', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch('http://localhost:5000/friendship/reject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`, // Utilisez les cookies pour obtenir le token
                },
                body: JSON.stringify({ requestId: request.id }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors du rejet de la demande.');
            }

            window.location.reload(); // Recharger pour mettre à jour la liste
        } catch (error) {
            console.error('Erreur lors du rejet de la demande', error);
        }
    };

    return (
        <li>
            <span>{request.senderId}</span>
            
            <button onClick={handleAccept}>Accepter</button>
            <button onClick={handleReject}>Rejeter</button>
        </li>
    );
};
export default FriendRequestItem; 