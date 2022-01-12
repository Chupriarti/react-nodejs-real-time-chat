import React from 'react';
import './app.css';
import EventSourcing from './EventSourcing';
import Longpolling from './LongPolling';
import WebSocketComponent from './WebSocket';

function App() {
  return (
    <div className="App">
      {/* <Longpolling /> */}
      {/* <EventSourcing /> */}
      <WebSocketComponent />
    </div>
  );
}

export default App;
