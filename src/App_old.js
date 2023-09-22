import logo from './logo.svg';
import './App.css';

import React from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function App() {
  // firebase基礎設定
  const firebaseConfig = {
    apiKey: "AIzaSyC09Fb82YLvyRvHovmM1pw3XNHs6EoqhK0",
    authDomain: "kio-fcm-test.firebaseapp.com",
    projectId: "kio-fcm-test",
    storageBucket: "kio-fcm-test.appspot.com",
    messagingSenderId: "815620995198",
    appId: "1:815620995198:web:0fec31c6325450875d002f",
    measurementId: "G-JW7G55WY3M"
  };

  // 初始化
  const app = initializeApp(firebaseConfig);
  const messaging = (async () => {
    return getMessaging(app);
  })();

  //const messaging = getMessaging(app);

  console.log(messaging);

  // 請求通知權限
  function requestPermission() {
    let granted = false;

    console.log('Checking notification permission...');

    if (Notification.permission !== 'granted') {
      console.log('Requesting permission...');
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') { // 請求通知權限通過，才去拿token
          console.log('Notification permission granted.');
          granted = true;
        } else if (permission === 'denied') {
          console.log('User denied the permission.');
        } else {
          console.log('Unable to get permission to notify.');
        }
      })
    } else {
      granted = true;
    }

    return granted;
  }

  if (requestPermission()) {
    console.log('通知權限正常');
    getFCMToken().then((currentToken) => {
      console.log('取得FCMToken: ' + currentToken);
    });
  } else {
    console.log('請求通知權限失敗，無通知權限，離開');
    return;
  }

  async function getFCMToken() {
    let messagingResolve = await messaging;

    if (messagingResolve) {
      return Promise.resolve(
          getToken(messagingResolve, {
              vapidKey: "BKC2K3enlJQzZB56b2byTeVnzj4B2X64RLwroDN4KlzJUHIAoLdmIHmcfyrJc18dzFAM0g68MYGTVFjTZ8oquJ4",
          })
      );
    }
  }

  // 監聽訊息
  (async () => {
    let messagingResolve = await messaging;
    if (messagingResolve) {
      onMessage(messagingResolve, (payload) => {
        console.log('Message received. ', payload);
      });
    }
  })();

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
