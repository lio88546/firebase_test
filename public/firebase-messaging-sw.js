/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

const defaultConfig = {
  apiKey: "AIzaSyC09Fb82YLvyRvHovmM1pw3XNHs6EoqhK0",
  authDomain: "kio-fcm-test.firebaseapp.com",
  projectId: "kio-fcm-test",
  storageBucket: "kio-fcm-test.appspot.com",
  messagingSenderId: "815620995198",
  appId: "1:815620995198:web:0fec31c6325450875d002f",
  measurementId: "G-JW7G55WY3M"
};

firebase.initializeApp(defaultConfig);
let messaging;

try {
  messaging = firebase.messaging();
} catch (err) {
  console.error('Failed to initialize Firebase Messaging', err);
}

// To dispaly background notifications
if (messaging) {
  try {
    messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body };
    self.registration.showNotification(notificationTitle, notificationOptions);
    });
  } catch (err) {
    console.log(err);
  }
}