import React, { useEffect } from 'react';
import io from 'socket.io-client';
import SendFriendRequest from '../../componente/sendFriendRequest/sendFriendRequest';
import FriendRequestList from '../../componente/friendRequestList/friendRequestList';
import './friend.css'

const socket = io('http://localhost:5000');

const Friend = () => {
    useEffect(() => {
        socket.on('friend request', (data) => {
            console.log('Nouvelle demande d’amitié reçue', data);
            // Mettre à jour l'état ou les composants pour afficher la nouvelle demande
        });

        socket.on('friend request accepted', (data) => {
            console.log('Demande d’amitié acceptée', data);
            // Mettre à jour l'état ou les composants pour refléter les changements
        });

        socket.on('friend request rejected', (data) => {
            console.log('Demande d’amitié rejetée', data);
            // Mettre à jour l'état ou les composants pour refléter les changements
        });

        return () => {
            socket.off('friend request');
            socket.off('friend request accepted');
            socket.off('friend request rejected');
        };
    }, []);

    return (
        <div>
       
            <FriendRequestList />

        </div>
    );
};

export default Friend;
