/**
 *
 * @param {Object} data the data objects to create the board tiles with
 */
let loadBoard = async (data) => {
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

            let star = document.createElement('star')
            let staricon = document.createElement('i')
            staricon.classList.add('fa-solid')
            staricon.classList.add('fa-star')
            star.appendChild(staricon)
            let img = document.createElement('img')
            img.src = data[targetData].img ? data[targetData].img : 'https://oldschool.runescape.wiki/images/Frog_%28Ruins_of_Camdozaal%29.png?6ae5e'

            tile.appendChild(flag1)
            tile.appendChild(flag2)
            tile.appendChild(star)
            tile.appendChild(img)
            _MAIN.appendChild(tile)
        }
    }
    return -1
}

let updateTiles = (g1, g2) => {
    document.querySelectorAll('tile').forEach(tile=>{
        tile.dataset.team1 = g1[tile.dataset.coord]? g1[tile.dataset.coord]: false
        tile.dataset.team2 = g2[tile.dataset.coord]? g2[tile.dataset.coord]: false 
    })

}


export { loadBoard, updateTiles }