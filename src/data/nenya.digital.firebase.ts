// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDeDekNhSFtmvuP_6199aG2X5x5r4_eMIA',
  authDomain: 'nenya-digital.firebaseapp.com',
  projectId: 'nenya-digital',
  storageBucket: 'nenya-digital.appspot.com',
  messagingSenderId: '359692635988',
  appId: '1:359692635988:web:2ef722e5678f36a052c2c1',
  measurementId: 'G-3MV4P72KS5',
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
const analytics = getAnalytics( app );
