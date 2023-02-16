import { app, db, auth, firebaseConfig } from './fs.js'
import { collection, doc, docs, getDocs, onSnapshot } from 'firebase/firestore'
import { loadBoard, updateTiles, fillDetailPannel } from './js/app.js'

let remoteTiles = collection(db, 'Tiles')
let allTiles = {}
let targetGroup = 'none'
let group1 = []
let group2 = []
let favorite = []




async function queryForDocuments() {
    const querySnapshot = await getDocs(remoteTiles)
    querySnapshot.docs.forEach((doc) => {
        allTiles[doc.id] = {
            id: doc.id,
            ...doc.data()
        }
    })
}

queryForDocuments().then(() => {
    loadBoard(allTiles, targetGroup).then(() => {
        targetGroup = document.body.id || false 
        document.querySelectorAll('tile').forEach((tile) => {
            tile.addEventListener('click', (e) => {
                fillDetailPannel(e.currentTarget.dataset, targetGroup)
                document.querySelectorAll('.SELECTED').forEach((el)=>{el.classList.remove('SELECTED')})
                e.currentTarget.classList.add('SELECTED')
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
                updateTiles(group1, group2, favorite)
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
                updateTiles(group1, group2, favorite)
            })

        if (targetGroup != false) {
            const favSnap = onSnapshot(
                doc(db, targetGroup, "Favorite"),
                { includeMetadataChanges: true },
                (doc) => {
                    favorite = []
                    Object.entries(doc.data()).forEach((tile) => {
                        // document.querySelector(`[data-coord="${tile[0]}"]`).dataset.team1 = tile[1]
                        favorite[tile[0]] = tile[1]
                    })
                    updateTiles(group1, group2, favorite)
                })
        }

    })
})
