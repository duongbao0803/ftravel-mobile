import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import '@firebase/messaging';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};
