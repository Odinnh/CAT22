import { app, db, auth, firebaseConfig } from '../fs.js'
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 *
 * @param {Object} data the data objects to create the board tiles with
 */
let loadBoard = async (data, tg) => {
    const _MAIN = document.querySelector('main')
    for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 7; j++) {
            let targetData = j.toString() + i.toString()
            let tile = document.createElement('tile')
            tile.dataset.team2 = "false"
            tile.dataset.favorite = "false"
            tile.dataset.coord = data[targetData].id
            tile.dataset.team1 = "false"

            let flag1 = document.createElement('flag')
            let flag1icon = document.createElement('i')
            flag1icon.classList.add('fa-solid')
            flag1icon.classList.add('fa-chess-knight')
            flag1.appendChild(flag1icon)

            let flag2 = document.createElement('flag')
            let flag2icon = document.createElement('i')
            flag2icon.classList.add('fa-solid')
            flag2icon.classList.add('fa-dumbbell')
            flag2.appendChild(flag2icon)

            let heart = document.createElement('heart')
            let hearticon = document.createElement('i')
            hearticon.classList.add('fa-solid')
            hearticon.classList.add('fa-heart')
            heart.appendChild(hearticon)
            let img = document.createElement('img')
            img.src = data[targetData].img ? data[targetData].img : 'https://oldschool.runescape.wiki/images/Frog_%28Ruins_of_Camdozaal%29.png?6ae5e'

            tile.appendChild(flag1)
            tile.appendChild(flag2)
            tile.appendChild(heart)
            tile.appendChild(img)
            _MAIN.appendChild(tile)
        }
    }
    return -1
}
let fillDetailPannel = async (yx, tg, favorite) => {

    const docRef = doc(db, `Tiles/${yx.coord}`);
    const docSnap = await getDoc(docRef);
    const _ASIDE = document.querySelector('aside')
    _ASIDE.innerHTML = ""

    if (docSnap.exists()) {
        let data = { ...docSnap.data() }
        let tile = document.createElement('tile')
        tile.dataset.team2 = "false"
        tile.dataset.favorite = "false"
        tile.dataset.coord = yx.coord
        tile.dataset.team1 = "false"
        if (tg == 'group1' || tg == 'group2') {
            
            let heart = document.createElement('heart')
            let hearticon = document.createElement('i')
            hearticon.classList.add('fa-solid')
            hearticon.classList.add('fa-heart')
            heart.appendChild(hearticon)
            let heartbgicon = document.createElement('i')
            heartbgicon.classList.add('fa-regular')
            heartbgicon.classList.add('fa-heart')
            heart.appendChild(heartbgicon)
            heart.addEventListener('click', () => {
                toggleTile({ yx: yx.coord, tg: tg, targetDoc: 'Favorite' })
            })
            
            
            tile.appendChild(heart)
        }
        let img = document.createElement('img')
        img.src = data.img ? data.img : 'https://oldschool.runescape.wiki/images/Frog_%28Ruins_of_Camdozaal%29.png?6ae5e'
        tile.appendChild(img)
        _ASIDE.appendChild(tile)

        let coords = document.createElement('h2')
        let formattedCoords = `{ ${yx.coord.split('')[0]} , ${yx.coord.split('')[1]} }`
        coords.innerHTML = formattedCoords
        _ASIDE.appendChild(coords)
        let title = document.createElement('h1')
        title.innerHTML = data.title ? data.title : 'no title found'
        _ASIDE.appendChild(title)
        let paragraph = document.createElement('p')
        paragraph.innerHTML = data.description ? data.description : 'no description found'
        _ASIDE.appendChild(paragraph)
        let button = document.createElement('button')
        button.classList.add('prevent-select')
        button.addEventListener('click', () => {
            toggleTile({ yx: yx.coord, tg: tg, targetDoc: 'Collected' })
        })
        button.innerHTML = "Toggle Collected"
        _ASIDE.appendChild(button)


    }
    return -1
}

let toggleTile = async ({ tg, yx, targetDoc }) => {
    const docRef = doc(db, `${tg}/${targetDoc}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let data = docSnap.data()
        console.log(data[yx])
        data[yx] = !data[yx] || false
        await setDoc(doc(db, tg, targetDoc), data);
    }
}
let updateTiles = (g1, g2, fav) => {
    document.querySelectorAll('tile').forEach(tile => {
        tile.dataset.team1 = g1[tile.dataset.coord] ? g1[tile.dataset.coord] : false
        tile.dataset.team2 = g2[tile.dataset.coord] ? g2[tile.dataset.coord] : false
        tile.dataset.favorite = fav[tile.dataset.coord] ? fav[tile.dataset.coord] : false
    })
    let g1score = 0
    g1.forEach((el)=>{
        g1score += el
    })
    document.querySelector('score1').innerHTML = g1score
    let g2score = 0
    g2.forEach((el)=>{
        g2score += el
    })
    document.querySelector('score2').innerHTML = g2score


}
async function queryTileData() {
    const querySnapshot = await getDoc()
    querySnapshot.docs.forEach((doc) => {
        allTiles[doc.id] = {
            id: doc.id,
            ...doc.data()
        }
    })
}


export { loadBoard, updateTiles, fillDetailPannel }