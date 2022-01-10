import React from 'react';
import './app.css';
import Longpolling from './LongPolling';

function App() {
  return (
    <div className="App">
      {/* <Longpolling /> */}
      <EventSourcing />
    </div>
  );
}

export default App;
