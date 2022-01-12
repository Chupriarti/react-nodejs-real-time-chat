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
        socket.current.onmessage = () => {
            
        }
        socket.current.onclose = () => {
            console.warn('Socket closed');
        }
        socket.current.onerror = () => {
            console.error('Socket error');
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
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
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WebSocketComponent;
