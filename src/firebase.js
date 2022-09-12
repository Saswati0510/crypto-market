// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBXvrQZqMY29clUDtBj9lEXofjgH1P0xao',
    authDomain: 'crypto-market-cb73e.firebaseapp.com',
    projectId: 'crypto-market-cb73e',
    storageBucket: 'crypto-market-cb73e.appspot.com',
    messagingSenderId: 'messagingSenderId',
    appId: '1:133475493062:web:055d3adbbc1f4fbd8923c7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;