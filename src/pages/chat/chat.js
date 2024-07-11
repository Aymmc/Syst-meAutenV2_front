// src/pages/chat.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

// Assurez-vous que l'URL du serveur correspond à votre configuration
const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        // Récupérer les détails de l'utilisateur
        const fetchUserDetails = async () => {
            const token = Cookies.get('authToken');
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/user', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (!response.ok) throw new Error('Erreur lors de la récupération des détails de l\'utilisateur');
                    
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error.message);
                }
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        // Écouter les messages du serveur
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, `${msg.pseudo}: ${msg.text}`]);
        });

        // Nettoyer les événements lors de la déconnexion
        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleJoin = () => {
        // Utiliser directement le pseudo récupéré au lieu de demander à l'utilisateur
        if (user && user.login) {
            socket.emit('join', user.login);
            setJoined(true);
            console.log(user.login);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            socket.emit('chat message', { pseudo: user.login, text: input });
            setInput('');
            console.log(user.login);
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            {!joined ? (
                <div>
                    {user && user.login ? (
                        <button onClick={handleJoin}>Rejoins le chat :  {user.login}</button>
                    ) : (
                        <p>Chargement...</p>
                    )}
                </div>
            ) : (
                <>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button type="submit">Send</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Chat;
