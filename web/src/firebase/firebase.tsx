import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBox7z0b2SBEnz0v6qmQjFx3QfUJcG099U',
  authDomain: 'volunteerclub-14b7a.firebaseapp.com',
  projectId: 'volunteerclub-14b7a',
  storageBucket: 'volunteerclub-14b7a.appspot.com',
  messagingSenderId: '765497707892',
  appId: '1:765497707892:web:d1fb4e8f77881366037021',
  measurementId: 'G-TLM9P3DCKS',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Export Firebase authentication service
export const auth = getAuth(app);
