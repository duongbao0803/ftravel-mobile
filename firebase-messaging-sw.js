importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.22.1/firebase-messaging.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/7.22.1/firebase-analytics.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyBdzJTOazGcj1g4eBLZK3Rjj1jlg0naacU',
  authDomain: 'swd392-d2c4e.firebaseapp.com',
  projectId: 'swd392-d2c4e',
  storageBucket: 'swd392-d2c4e.appspot.com',
  messagingSenderId: '47109893633',
  appId: '1:47109893633:web:e4f1860d2f7bb01fe81a00',
  measurementId: 'G-8ZJBXCKP8M',
});

const messaging = firebase.messaging();
