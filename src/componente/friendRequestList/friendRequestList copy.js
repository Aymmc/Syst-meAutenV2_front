import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Assurez-vous que js-cookie est installé

const FriendRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:5000/friendship/requests', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('authToken')}`, // Utilisez les cookies pour obtenir le token
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des demandes.');
                }

                const data = await response.json();
                setRequests(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des demandes', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <h2>Demandes d’amitié</h2>
            <ul>
                {requests.length === 0 ? (
                    <li>Aucune demande d’amitié.</li>
                ) : (
                    requests.map((request) => (
                        <FriendRequestItem key={request.id} request={request} />
                    ))
                )}
            </ul>
        </div>
    );
};

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
            <span>ID de l'expéditeur: {request.senderId}</span>
            <button onClick={handleAccept}>Accepter</button>
            <button onClick={handleReject}>Rejeter</button>
        </li>
    );
};

export default FriendRequestList;
