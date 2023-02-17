import { app, db, auth, firebaseConfig } from '../fs.js'
import { doc, getDoc, setDoc } from "firebase/firestore";

// let jsonObject = {
//     '11': {
//         title: 'Garage Door Gamble I',
//         description: 'Obtain a Bandos chestplate from General Graar\'dor.',
//         img: 'https://oldschool.runescape.wiki/images/thumb/Bandos_chestplate_detail.png/100px-Bandos_chestplate_detail.png?98028',
//     },
//     '12': {
//         title: 'Shoot the Birdy',
//         description: 'Obtain any unique from General Kree\'arra: Armadyl helmet, chestplate, chainskirt or hilt.',
//         img: 'https://oldschool.runescape.wiki/images/thumb/Kree%27arra.png/280px-Kree%27arra.png?ba75c',
//     }, 
//     '13': {
//         title: '...And my Sword! I',
//         description: 'Obtain any godsword hilt (Ancient, Armadyl, Bandos, Saradomin, Zamorak).',
//         img: 'https://oldschool.runescape.wiki/images/Saradomin_hilt_detail.png?f9ce8',
//     }, 
//     '14': {
//         title: 'Stabby Stabby',
//         description: 'Obtain a Zamorakian spear from K\'ril Tsutsaroth.',
//         img: 'https://oldschool.runescape.wiki/images/Zamorakian_spear.png?420f4',
//     }, 
//     '15': {
//         title: 'Who Needs Guthans?',
//         description: 'Obtain a Bloodshard by thieving or killing Vyres.',
//         img: 'https://oldschool.runescape.wiki/images/Blood_shard.png?3d4c6',
//     }, 
//     '16': {
//         title: 'Tomb Raider I',
//         description: 'Obtain a Thread of Elidnis from Tombs of Amascut.',
//         img: 'https://oldschool.runescape.wiki/images/Thread_of_elidinis.png?b0b20',
//     }, 
//     '17': {
//         title: 'Needle in a Haystack',
//         description: 'Obtain an Abyssal needle from Guardians of the Rift.',
//         img: 'https://oldschool.runescape.wiki/images/Abyssal_needle.png?5b006',
//     }, 
//     '21': {
//         title: 'God Help Me',
//         description: 'Obtain any god d\'hide body from a hard casket.',
//         img: 'https://oldschool.runescape.wiki/images/Saradomin_d%27hide_body.png?11815',
//     }, 
//     '22': {
//         title: 'Bloodhound When?',
//         description: 'Obtain and complete a master clue. If you have one banked already, you must get a new one and complete all steps for the tile to be completed.',
//         img: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28master%29.png?09bb0',
//     }, 
//     '23': {
//         title: 'That 70s Tile',
//         description: 'Obtain any of Bob\'s shirts or Flared trousers from an easy casket.',
//         img: 'https://oldschool.runescape.wiki/images/Bob%27s_red_shirt.png?ada18',
//     }, 
//     '24': {
//         title: 'Return of a Monk\'s Friend',
//         description: 'Obtain any mitre or crozier from a medium casket.',
//         img: 'https://oldschool.runescape.wiki/images/Saradomin_mitre_chathead.png?61716',
//     }, 
//     '25': {
//         title: 'Hats Off',
//         description: 'Obtain any headband or boater from a medium casket.',
//         img: 'https://oldschool.runescape.wiki/images/Orange_boater_chathead.png?791b3',
//     }, 
//     '26': {
//         title: 'Big High War Garb',
//         description: 'Obtain a Bandos cloak from a medium casket or Bandos platebody from a hard casket.',
//         img: 'https://oldschool.runescape.wiki/images/Bandos_platebody_equipped_female.png?c537e',
//     }, 
//     '27': {
//         title: 'Light my Fire I',
//         description: 'Obtain an Abyssal lantern from Guardians of the Rift.',
//         img: 'https://oldschool.runescape.wiki/images/Abyssal_lantern_%28redwood_logs%29.png?92f93',
//     }, 
//     '31': {
//         title: 'Grave Robbing',
//         description: 'Obtain either a full Ahrim\'s or full Guthan\'s set.',
//         img: 'https://oldschool.runescape.wiki/images/Ahrim%27s_robes_equipped_female.png?91894',
//     }, 
//     '32': {
//         title: 'Rigourous Raider',
//         description: 'Obtain a Dextrous prayer scroll from the Chambers of Xeric.',
//         img: 'https://oldschool.runescape.wiki/images/Rigour.png?159e1',
//     }, 
//     '33': {
//         title: 'Monkey Business',
//         description: 'Obtain a Zenyte shard from Demonic gorillas.',
//         img: 'https://oldschool.runescape.wiki/images/Demonic_gorilla.png?5f457',
//     }, 
//     '34': {
//         title: 'Risky Business',
//         description: 'Obtain any wilderness weapon from the Revenants (Craw\'s bow, Thammaron\'s sceptre, Viggora\'s chainmace).',
//         img: 'https://oldschool.runescape.wiki/images/Craw%27s_bow_%28u%29.png?5352a',
//     }, 
//     '35': {
//         title: 'Slay All Day',
//         description: 'Obtain any superior slayer monster unique (Imbued heart, Dust/Mist battlestaff, Eternal gem).',
//         img: 'https://oldschool.runescape.wiki/images/Imbued_heart.png?19317',
//     }, 
//     '36': {
//         title: 'Majishun',
//         description: 'Obtain an Arcane prayer scroll from the Chambers of Xeric.',
//         img: 'https://oldschool.runescape.wiki/images/Augury.png?f234e',
//     }, 
//     '37': {
//         title: 'Good Boi',
//         description: 'Obtain any pet from the "all pets" tab. Duplicate pets are allowed.',
//         img: 'https://oldschool.runescape.wiki/images/Hellpuppy_%28follower%29.png?b9d9d',
//     }, 
//     '41': {
//         title: 'Light my Fire II',
//         description: 'Obtain a Tome of fire from Wintertodt.',
//         img: 'https://oldschool.runescape.wiki/images/Tome_of_fire_%28empty%29.png?c9227',
//     }, 
//     '42': {
//         title: 'This is Fine',
//         description: 'Obtain a Tome of water from Tempoross.',
//         img: 'https://oldschool.runescape.wiki/images/Tome_of_water_%28empty%29.png?c9227',
//     }, 
//     '43': {
//         title: 'Holy Moley!',
//         description: 'Obtain a total of 500 mole parts from the Giant Mole (Mole claws + skins).',
//         img: 'https://oldschool.runescape.wiki/images/Giant_Mole.png?3f58a',
//     }, 
//     '44': {
//         title: 'Unsolicited DPicks',
//         description: 'Obtain a dragon pickaxe or broken dragon pickaxe (Wildy bosses, KQ, Volcanic Mine).',
//         img: 'https://oldschool.runescape.wiki/images/Dragon_pickaxe.png?c85b3',
//     }, 
//     '45': {
//         title: 'Mummy!',
//         description: 'Obtain a Pharaoh\'s Sceptre from Pyramid Plunder.',
//         img: 'https://oldschool.runescape.wiki/images/Pharaoh%27s_sceptre_%281%29.png?f3f6a',
//     }, 
//     '46': {
//         title: 'Heraldic Hero',
//         description: 'Obtain a Rune helm (h) or a Rune shield (h) from a hard casket.',
//         img: 'https://oldschool.runescape.wiki/images/Rune_shield_%28h1%29.png?fe6a8',
//     }, 
//     '47': {
//         title: 'A qp',
//         description: 'As a team, complete any 5 quests.',
//         img: 'https://oldschool.runescape.wiki/images/Quests.png?f5120',
//     }, 
//     '51': {
//         title: 'Down and Dirty',
//         description: 'Obtain a Mud battlestaff from Dagannoth Prime.',
//         img: 'https://oldschool.runescape.wiki/images/Dagannoth_Prime.png?945b1',
//     }, 
//     '52': {
//         title: 'Expert Trapper',
//         description: 'As a team, gain 666k hunter xp.',
//         img: 'https://oldschool.runescape.wiki/images/Hunter_icon.png?8762f',
//     }, 
//     '53': {
//         title: 'Snek Bite',
//         description: 'Obtain a Tanzanite fang, Magic fang, or Serpentine visage from Zulrah.',
//         img: 'https://oldschool.runescape.wiki/images/Zulrah_%28serpentine%29.png?29a54',
//     }, 
//     '54': {
//         title: 'Pegasian Precursor',
//         description: 'Obtain a pair of Ranger boots from a medium casket.',
//         img: 'https://oldschool.runescape.wiki/images/Ranger_boots.png?9a45f',
//     }, 
//     '55': {
//         title: 'Tephra Tosser',
//         description: 'Obtain a Crystal tool seed or Zalcano shard.',
//         img: 'https://oldschool.runescape.wiki/images/Imbued_tephra.png?7331d',
//     }, 
//     '56': {
//         title: 'Garage Door Gamble II',
//         description: 'Obtain Bandos tassets from General Graar\'dor.',
//         img: 'https://oldschool.runescape.wiki/images/Bandos_tassets.png?f928c',
//     }, 
//     '57': {
//         title: '...And my Sword! II',
//         description: 'Obtain all three Godsword shards (1, 2, and 3).',
//         img: 'https://oldschool.runescape.wiki/images/Godsword_blade.png?fc2ef',
//     }, 
//     '61': {
//         title: 'The Grass Hopper',
//         description: 'As a team, obtain 500k farming xp.',
//         img: 'https://oldschool.runescape.wiki/images/Farming_icon.png?558fa',
//     }, 
//     '62': {
//         title: 'Quick Smash',
//         description: 'Obtain a Granite maul from a Gargoyle, Marble gargoyle or from the Grotesque Guardians.',
//         img: 'https://oldschool.runescape.wiki/images/Granite_maul.png?e75c0',
//     }, 
//     '63': {
//         title: 'Parkour!',
//         description: 'As a team, obtain 500k agility xp.',
//         img: 'https://oldschool.runescape.wiki/images/Agility_icon.png?389e0',
//     }, 
//     '64': {
//         title: 'Tomb Raider II',
//         description: 'Obtain any unique from the Tombs of Amascut, other than the Thread of Elidinis.',
//         img: 'https://oldschool.runescape.wiki/images/Chest_%28Tombs_of_Amascut%2C_open%29.png?a0d1e',
//     }, 
//     '65': {
//         title: 'Volcanic Forging I',
//         description: 'Assemble a Malediction ward from scratch (Chaos Fanatic, Crazy Archaologist, Scorpia).',
//         img: 'https://oldschool.runescape.wiki/images/Malediction_ward.png?ed6d0',
//     }, 
//     '66':{
//         title: 'Minor Setback',
//         description: 'As a team, obtain one million mining xp.',
//         img: 'https://oldschool.runescape.wiki/images/Mining_icon.png?00870',
//     }, 
//     '67': {
//         title: 'UnaVOIDable',
//         description: 'As a team, obtain a total of 1250 void knight commendation points from Pest Control.',
//         img: 'https://oldschool.runescape.wiki/images/Elite_void_set_equipped_male.png?84fe9',
//     }, 
//     '71': {
//         title: 'Tornado Dodger',
//         description: 'Obtain either a Crystal armour seed or an Enhanced weapon seed from the Gauntlet or Corrupted Gauntlet.',
//         img: 'https://oldschool.runescape.wiki/images/Corrupted_Hunllef.png?0cd55',
//     }, 
//     '72': {
//         title: 'Mage Killer',
//         description: 'Obtain a Seercull from Dagannoth Supreme (used in elite clues).',
//         img: 'https://oldschool.runescape.wiki/images/Seercull.png?c943f',
//     }, 
//     '73': {
//         title: 'Chop Chop!',
//         description: 'Obtain a dragon axe from the Dagannoth Kings or Wintertodt.',
//         img: 'https://oldschool.runescape.wiki/images/Dragon_axe.png?c85b3',
//     }, 
//     '74': {
//         title: '(Un)holy Scriptures',
//         description: 'Obtain god pages 1, 2, 3, and 4 (does not need to be from the same god).',
//         img: 'https://oldschool.runescape.wiki/images/Guthix_page_1.png?d316a',
//     }, 
//     '75': {
//         title: 'Pray for Your Team',
//         description: 'As a team, gain 1 million prayer xp (from scratch, cannot use pre-bingo banked xp).',
//         img: 'https://oldschool.runescape.wiki/images/Dragon_bones.png?e2602',
//     }, 
//     '76': {
//         title: 'Purple CoX',
//         description: 'Obtain any non-scroll purple from the Chambers of Xeric.',
//         img: 'https://oldschool.runescape.wiki/images/Twisted_bow.png?08f42',
//     }, 
//     '77': {
//         title: 'Volcanic Forging II',
//         description: 'Assemble an odium ward from scratch (Chaos Fanatic, Crazy Archaologist, Scorpia).',
//         img: 'https://oldschool.runescape.wiki/images/Odium_ward.png?b959a',
//     }
// }
// let tempFunc = async () =>{

//     for (let bata in jsonObject){
//     console.log(jsonObject[bata])
//         await setDoc(doc(db, "Tiles", bata ), jsonObject[bata]);
//     }
// }

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
        
        tile.dataset.favorite = document.querySelector('main').querySelector(`[data-coord="${yx.coord}"]`).dataset.favorite
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
    if (docSnap.exists() && tg !== 'index') {
        let data = docSnap.data()
        console.log(data[yx])
        data[yx] = !data[yx] || false
        await setDoc(doc(db, tg, targetDoc), data);
    } 
    // else if (tg == 'index') {
    //     tempFunc()
    // }

}
let updateTiles = (g1, g2, fav) => {
    document.querySelectorAll('tile').forEach(tile => {
        tile.dataset.team1 = g1[tile.dataset.coord] ? g1[tile.dataset.coord] : false
        tile.dataset.team2 = g2[tile.dataset.coord] ? g2[tile.dataset.coord] : false
        tile.dataset.favorite = fav[tile.dataset.coord] ? fav[tile.dataset.coord] : false
    })
    let g1score = 0
    g1.forEach((el) => {
        g1score += el
    })
    document.querySelector('score1').innerHTML = g1score
    let g2score = 0
    g2.forEach((el) => {
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