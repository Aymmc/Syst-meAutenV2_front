import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import './chat.css';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
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
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleJoin = () => {
        if (user && user.login) {
            socket.emit('join', user.login);
            setJoined(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const receiver = document.getElementById('receiverInput').value;  // Cette ligne peut être enlevée si vous ne l'utilisez pas

        if (input.trim()) {
            const message = { pseudo: user.login, text: input };
            console.log('Sending message:', message, 'to', receiver);

            // Ajoute le message envoyé à l'état local
            setMessages((prevMessages) => [...prevMessages, message]);

            // Envoi du message au serveur
            socket.emit('chat message', message, receiver);

            setInput('');
        }
    };

    return (
        <div className='chat-wrapper'>
            <div className='chat-content'>
                <h1>Chat App</h1>
            
                {!joined ? (
                    <div>
                        {user && user.login ? (
                            <button onClick={handleJoin}>Rejoins le chat : {user.login}</button>
                        ) : (
                            <p>Chargement...</p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className='messages'>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message-bubble ${
                                        msg.pseudo === user.login ? 'user-message' : 'other-message'
                                    }`}
                                >
                                    <strong>{msg.pseudo}:</strong> {msg.text}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <form className='send-bar' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">
                    Envoyé
                </button>
            </form>
        </div>
    );
};

export default Chat;
