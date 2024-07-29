import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Assurez-vous que js-cookie est installé
import './App.css'; // Assurez-vous d'avoir les styles appropriés dans ce fichier CSS
import FriendList from '../friendList/friendList';


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
        <div className='list'>
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
            <span>{request.senderId}</span>
            
            <button onClick={handleAccept}>Accepter</button>
            <button onClick={handleReject}>Rejeter</button>
        </li>
    );
};

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
        <div className='request'>
            <input
                type="text"
                value={receiverLogin}
                onChange={(e) => setReceiverLogin(e.target.value)}
                placeholder=""
            />
            <button onClick={handleSendRequest}>Envoyer une demande</button>
            {message && <p>{message}</p>}
            <FriendList/>
        </div>
    );
};

const Burger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
                <a href="#" className="close" onClick={toggleNav}>×</a>
                <FriendRequestList />
                <SendFriendRequest />
            </div>

            <a href="#" id="openBtn" onClick={toggleNav}>
                <span className="burger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </a>
        </div>
    );
};

export default Burger;
