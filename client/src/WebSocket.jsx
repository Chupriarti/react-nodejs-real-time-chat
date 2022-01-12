import React from 'react';
import axios from 'axios';

const WebSocketComponent = () => {
    const [messages, setMessages] = React.useState([]);
    const [value, setValue] = React.useState("");
    const socket = React.useRef();
    const [connected, setConnected] = React.useState(false);
    const [username, setUsername] = React.useState("");

    function connect () {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message));
            console.warn('Connected to websocket')

        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
        socket.current.onclose = () => {
            console.warn('Socket closed');
        }
        socket.current.onerror = () => {
            console.error('Socket error');
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text" 
                        placeholder='Enter username' 
                    />
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                        type="text" 
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {messages.map( mess => 
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className='connection_message'>
                                    User {mess.username} connected
                                </div>
                                : <div className='message'>
                                    {mess.username}: {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WebSocketComponent;
