import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAnOiG77O1ukT9C2x8u1VbMLw7For9C_3w",
    authDomain: "bingo-50cec.firebaseapp.com",
    databaseURL: "https://bingo-50cec-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bingo-50cec",
    storageBucket: "bingo-50cec.appspot.com",
    messagingSenderId: "866066986693",
    appId: "1:866066986693:web:d1a5bb328eba2aef0562ac",
    measurementId: "G-SDLQC2W859"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app);

export { app, db, auth, firebaseConfig }