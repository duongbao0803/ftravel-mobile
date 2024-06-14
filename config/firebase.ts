import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import '@firebase/messaging';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBdzJTOazGcj1g4eBLZK3Rjj1jlg0naacU',
  authDomain: 'swd392-d2c4e.firebaseapp.com',
  projectId: 'swd392-d2c4e',
  storageBucket: 'swd392-d2c4e.appspot.com',
  messagingSenderId: '47109893633',
  appId: '1:47109893633:web:e4f1860d2f7bb01fe81a00',
  measurementId: 'G-8ZJBXCKP8M',
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); //Firebase Storage

export {app, storage};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
