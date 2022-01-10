import React from 'react';
import axios from 'axios';

const EventSourcing = () => {
    const [messages, setMessages] = React.useState([]);
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        const EventSource = new EventSource('http://localhost:5000/connect');
        EventSource.onmessage = function (event) {
            console.log(event.data);
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
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

export default EventSourcing;