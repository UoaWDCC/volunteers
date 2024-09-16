// Import the functions you need from the SDKs you need
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const credentials = JSON.parse(process.env.credentials || '{}');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  ...firebaseConfig,
});

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth and Google Auth Provider
export const auth = getAuth(app);