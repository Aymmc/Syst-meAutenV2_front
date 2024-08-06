import React from 'react';
import Cookies from 'js-cookie'; // Assurez-vous que js-cookie est installé
import accept from './accept.png'
import refuse from './refuse.png'

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
        <li className='requestbutton'>
            <span>{request.senderLogin}</span> 
            
            <button className="accepte"onClick={handleAccept}><img src={accept}/></button>
            <button className="refuse"onClick={handleReject}><img src={refuse}/></button>
        </li>
    );
};
export default FriendRequestItem; 