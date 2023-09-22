import logo from './logo.svg';
import './App.css';
import React from 'react';
import { messaging } from "./firebase/init"; // Firebase初始化
import { main as fcm_main } from "./firebase/messaging"; // Firebase Cloud Messaging

function App() {

  // FCM 進入點
  fcm_main(messaging).catch((error) => {
    console.error(error);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
