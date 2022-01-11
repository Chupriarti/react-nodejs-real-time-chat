import React from 'react';
import './app.css';
import EventSourcing from './EventSourcing';
import Longpolling from './LongPolling';
import WebSocket from './WebSocket';

function App() {
  return (
    <div className="App">
      {/* <Longpolling /> */}
      {/* <EventSourcing /> */}
      <WebSocket />
    </div>
  );
}

export default App;
