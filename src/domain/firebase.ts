import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const rawConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
const firebaseConfig = JSON.parse( rawConfig );

// Initialize Firebase
const app = initializeApp( firebaseConfig );

export const auth = getAuth( app );

export default app;
