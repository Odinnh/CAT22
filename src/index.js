import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
    getFirestore, doc, docs, collection,
    setDoc, getDoc, getDocs, query, onSnapshot
} from 'firebase/firestore'

import { loadBoard, updateTiles } from './js/app.js'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app);
//detect auth state

let remoteTiles = collection(db, 'Tiles')
let allTiles = {}
let group1 = []
let group2 = []

let loadoutIndex = 0
// async function propLoadouts() {
//     const mySnapshot = await getDoc(remoteLoadouts)
//     if (mySnapshot.exists()) {
//         const docData = mySnapshot.data()
//         loadouts.push(docData)
//         console.log(loadouts)
//     }
//
// }

async function queryForDocuments() {
    const querySnapshot = await getDocs(remoteTiles)
    querySnapshot.docs.forEach((doc) => {
        allTiles[doc.id] = {
            id: doc.id,
            ...doc.data()
        }
    })


}


onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in')
    } else {
        console.log('no user')
    }
})
// loadBoard(data)
queryForDocuments().then(() => {
    loadBoard(allTiles).then(() => {
        document.querySelectorAll('tile').forEach((tile) => {
            tile.addEventListener('click', (e) => {
                console.log(e.currentTarget)
            })

        })
        const unsub = onSnapshot(
            doc(db, "group1", "Collected"),
            { includeMetadataChanges: true },
            (doc) => {
                group1 = []
                Object.entries(doc.data()).forEach((tile) => {
                    // document.querySelector(`[data-coord="${tile[0]}"]`).dataset.team1 = tile[1]
                    group1[tile[0]] = tile[1]
                })
                updateTiles(group1, group2)
            })
        const unsub2 = onSnapshot(
            doc(db, "group2", "Collected"),
            { includeMetadataChanges: true },
            (doc) => {
                group2 = []
                Object.entries(doc.data()).forEach((tile) => {
                    // document.querySelector(`[data-coord="${tile[0]}"]`).dataset.team2 = tile[1]
                    group2[tile[0]] = tile[1]

                })
                updateTiles(group1, group2)
            })
    })
})
