import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDhh-luFO_tthXaFCwpe88lVdQGPSShAQk",
    authDomain: "ema-john-simple-rn.firebaseapp.com",
    projectId: "ema-john-simple-rn",
    storageBucket: "ema-john-simple-rn.appspot.com",
    messagingSenderId: "988958500175",
    appId: "1:988958500175:web:48721bc26d0c41bde8d13a"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;