import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDoWomlQ12W_rljOFRFC0VmS3FhCHpXKnc',
  authDomain: 'auth-dev-1eb74.firebaseapp.com',
  projectId: 'auth-dev-1eb74',
  storageBucket: 'auth-dev-1eb74.appspot.com',
  messagingSenderId: '39107459609',
  appId: '1:39107459609:web:6ca36f352c59c5f7668888',
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

export const auth = getAuth( app );

export default app;
