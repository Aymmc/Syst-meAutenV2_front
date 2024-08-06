import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Importez js-cookie

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch('http://localhost:5000/friendship/list', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('authToken')}`  // Utilisez les cookies pour obtenir le token
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des amis.');
                }

                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des amis', error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div className='list'>
            <h2>Mes Amis</h2>
            <select>
                {friends.map((friend) => (
                    <option value={friend.login} key={friend.id}>{friend.login}</option>
                ))}
            </select>
        </div>
    );
};

export default FriendList;
