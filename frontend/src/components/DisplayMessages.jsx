import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayMessages.css'

function DisplayMessages() {
    const [chatMessage, setChatMessage] = useState([]);
    const [username, setUsername] = useState('JohnDoe');
    const [room_id, setRoomId] = useState('123');
    const [message, setMessage] = useState('');

    const fetchChatMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/chat-message/');
            setChatMessage(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChatMessages();
        const interval = setInterval(() => {
            fetchChatMessages();
        }, 500);
        return () => clearInterval(interval)
    }, [])

    const sendMessage = async (event) => {
        event.preventDefault();

        try {
            const apiUrl = 'http://localhost:8000/send-message/'

            const data = {
                username,
                room_id,
                message
            }

            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            setMessage('');
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className='chatbox'>
            <h2 className="title">  - Groupe Change Group</h2>
            <div id="display" >
                {
                    chatMessage.length === 0 ? (
                        <p className='no-message'>Aucun message présent</p>
                    ) : (
                        chatMessage.map(a => {
                            let rawDate = new Date(a.date)
                            let formattedDate = rawDate.toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                            return (
                                <div key={a.id} className='darker'>
                                    <b>{a.user}</b>
                                    <p>{a.value}</p>
                                    <span>{formattedDate}</span>
                                </div>
                            )
                        })
                    )
                }
            </div>

            <div className="container">
                <form id="post-form" onSubmit={sendMessage}>
                    <input type="hidden" name="username" id="username" value={username} />
                    <input type="hidden" name="room_id" id="room_id" value={room_id} />
                    <input type="text" name="message" id="message" width="100px" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        </div>
    );
}

export default DisplayMessages;