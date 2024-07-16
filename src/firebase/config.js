// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyACG_hhRrcggxbrRMWaSyf9f4SIMh8UrWg",
    authDomain: "sposs-67a96.firebaseapp.com",
    projectId: "sposs-67a96",
    storageBucket: "sposs-67a96.appspot.com",
    messagingSenderId: "159639678398",
    appId: "1:159639678398:web:59f849abcb11f565f31def",
    measurementId: "G-KYFJ43CRCN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
