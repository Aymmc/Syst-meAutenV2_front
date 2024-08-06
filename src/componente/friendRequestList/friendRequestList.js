import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Assurez-vous que js-cookie est installé
import FriendList from '../friendList/friendList';
import FriendRequestItem from '../friendRequestItem/friendRequestItem';
import SendFriendRequest from '../sendFriendRequest/sendFriendRequest';

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
                <FriendList />
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
