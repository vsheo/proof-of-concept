import express from "express"
import { Liquid } from "liquidjs"
import fs from "fs"
import sharp from "sharp"
import path from 'path'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const engine = new Liquid()
app.engine("liquid", engine.express())
app.set("views", "./views")


// 12 uur in milliseconden = 43200000
const twelveH = 1
const now = Date.now()

// read de cache.json die lokaal staat
const cacheData = fs.readFileSync("cache.json", "utf-8")

// check als iets in cacheData geschreven staat, als dat zo is check de laatste keer dat de file was bewerkt
if (cacheData.length > 0) {
    // https://stackoverflow.com/questions/7559555/last-modified-file-date-in-node-js
    // check de laatste keer dat cache.json bewerkt was
    var stats = fs.statSync("cache.json")
    var mtime = stats.mtimeMs
    if (now - mtime < twelveH) {
        console.log("cache is new")
    }
    // Als cache.json ouder is dan 12 uur, wordt de Pokémon data opnieuw opgehaald en opgeslagen in cache.json
    else {
        getIndexData()
        console.log("cache geupdate")
    }
}
// als het leeg is voer de functie getIndexData() uit om de pokemon data op te halen
else {
    await getIndexData()
    console.log("cache is gemaakt")
}

// nadat cacheData bestaat/up to date is maken we JSON daarvan
const cacheDataJSON = JSON.parse(cacheData)



// index GET
app.get("/", async function (request, response, next) {
    try {

        // all caught pokemon
        const caughtList = await getBookmarks("vsheoPKM")
        // console.log(caughtList)

        // stuur maar 15 pokemon door naar de pagina
        const limitedPkmData = cacheDataJSON.slice(0, 15);

        response.render("index.liquid", { pkmData: limitedPkmData, pkmCaught: caughtList, pageTitle: "All Pokemon" })
    }
    catch (error) {
        // Andere fouten ook doorgeven aan error-handler
        const errorMessage = new Error("index try blok went wrong")
        errorMessage.status = 500;
        next(errorMessage)
    }
})

// index load more
app.get("/pokemon/up-to/:id", async function (request, response, next) {
    const id = parseInt(request.params.id, 10)
    const sliceId = id + 15

    try {
        // all caught pokemon
        const caughtList = await getBookmarks("vsheoPKM")
        // console.log(caughtList)

        // stuur maar 15 pokemon door naar de pagina
        const limitedPkmData = cacheDataJSON.slice(0, sliceId);

        response.render("index.liquid", { pkmData: limitedPkmData, pkmCaught: caughtList, pageTitle: "All Pokemon" })
    }
    catch (error) {
        // Andere fouten ook doorgeven aan error-handler
        const errorMessage = new Error("index try blok went wrong")
        errorMessage.status = 500;
        next(errorMessage)
    }
})

// index POST
app.post("/toggle-caught/:pkmId", async function (request, response) {
    const id = request.params.pkmId;
    // voeg een pokemon toe of verwijder een pokemon uit de caught pokemon lijst
    await changeCaught("vsheoPKM", id)
    // console.log(id)

    response.redirect('/')
})

// index Gen filter
app.get("/pokemon/generation-:number", async function (request, response, next) {
    try {
        const gen = request.params.number;

        if (gen < 1 || gen >= 10) {
            const error = new Error("Generation does not exist")
            error.status = 404
            return next(error)
        }

        /* statisch aangegeven wanneer een pokemon generation begint en eindigd.
        pkmGeneration[0] is een place holder. met request.params krijgen we een nummer. het laagtse nummer is 1, van generation-1 */
        const pkmGeneration = [0, [1,151], [152,251], [252,386], [387,493], [494,649], [650,721], [722,809], [810,905], [906,1025]]

        // maak een array met alle pokemon die hun id tussen de begin en eind id staat
        const genData = cacheDataJSON.filter(pkm =>
            pkm.id >= pkmGeneration[gen][0] && pkm.id <= pkmGeneration[gen][1]
        )

        // all caught pokemon
        const caughtList = await getBookmarks("vsheoPKM")

        response.render("index.liquid", { pkmData: genData, pkmCaught: caughtList, gen: gen, pageTitle: "Generation "+gen })
    }
    catch (error) {
        const errorMessage = new Error("generation try blok went wrong")
        errorMessage.status = 500;
        next(errorMessage)
    }
})

// index caught filter
app.get("/pokemon/caught", async function (request, response) {
    // all caught pokemon
    const caughtList = await getBookmarks("vsheoPKM")

    /* we hebben de id's van de pokemon die opgeslagen staan in directus.
    met include vergelijken we als de id van directus voorkomt in cache.json
    als dat true is wordt die pokemon data (species name, types en name) opgeslagen in de array:caughtData
    toString() is nodig omdat je dan een string met een string vergelijkt. zonder dit vergelijk je een integer met een string. */
    const caughtData = cacheDataJSON.filter(pkm =>
        caughtList.includes(pkm.id.toString())
    );

    response.render("index.liquid", { pkmCaught: caughtList, pkmData: caughtData, pageTitle: "Pokemon caught" })
})

// index search
app.get("/search", async function (request, response) {
    const searchName = request.query.query;

    /* filter naar de pokemon name, deel van de name, in de search bar 
    includes geeft true of false terug, als de letters van de search op dezelfde volgorde voorkomt in een pokemon name, dan returned het true
    en voegt het die pokemon data toe aan de array: findPkmData */
    const findPkmData = cacheDataJSON.filter(pokemon =>
        pokemon.name.includes(searchName.toLowerCase())
    );

    response.render("index.liquid", { pkmData:findPkmData })
});

// detail GET
app.get("/details/:pkmName", async function (request, response, next) {
    try {
        const pkmName = request.params.pkmName;

        // pokemon details and stats
        const pkmInfoResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmName}`)
        const pkmInfoRespJSON = await pkmInfoResp.json()

        // gebruik pokemon name, uit de url, en zoek naar de id van die pokemon in cache.json
        const findPkmInfo = cacheDataJSON.find(pokemon => pokemon.name === pkmName).id

        /* Met de pokemon id kan je een fetch URL maken.
        in deze url vind je de link naar de data voor de evolution-chain.
        in die url vind je de namen van hoe de evoluties van deze pokemon heten */
        const getEvoChain = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${findPkmInfo}`)
        const evoChain = await getEvoChain.json()

        /* op de url in evolution-chain voeren we een fetch uit */
        const getEvoData = await fetch(evoChain.evolution_chain.url)
        const evoData = await getEvoData.json()

        /* We hebben voor de evolution tab de id nodig.
        in deze response heb je geen id tag staan. maar de id staat wel in de species URL
        Met split kunnen we de id eruit halen
        split geeft een array terug met alles dat tussen '/' staat
        de url zijn altijd hetzelfde opgebouwd dus op positie [6] zal altijd de id nummer staan */
        const basicId = evoData.chain.species.url.split('/')[6]
        // console.log(basicId)

        // we hebben hierna een functie om id's op te halen. we maken deze arrays hier aan zodat we de id's uit de functie kunnen halen 
        let stageOneId = []
        let stageTwoId = []

        // check als een pokemon kan evovlen. als dat kan sla dan de id van de volgende vormen op
        if (evoData.chain.evolves_to.length > 0) {
            stageOneId = evoData.chain.evolves_to.map((pkmStage) => {
                return pkmStage.species.url.split('/')[6]
            });
            // console.log(stageOneId)

            stageTwoId = evoData.chain.evolves_to[0].evolves_to.map((pkmStage) => {
                return pkmStage.species.url.split('/')[6]
            });
            // console.log(stageTwoId)
        }

        // all caught pokemon
        const caughtList = await getBookmarks("vsheoPKM")
        // console.log(caughtList)

        response.render("detail.liquid", { pkmData: cacheDataJSON, pkmInfo: pkmInfoRespJSON, evolutions: evoData, basicId: basicId, stageOneIds: stageOneId, stageTwoIds: stageTwoId, pkmCaught: caughtList })
    }
    catch (error) {
        const errorMessage = new Error("detail try blok went wrong")
        errorMessage.status = 500;
        next(errorMessage)
    }
});


// FUNCTIES
// get names, id's and types van elke pokemon
async function getIndexData() {
    // deze url heeft alle pokemon names en een link naar de details van de pokemon waar de types staan
    const nameURLResp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
    const nameURLRespJSON = await nameURLResp.json()
    const pkmNameURL = nameURLRespJSON.results

    // https://hostman.com/tutorials/how-to-use-javascript-array-map/
    // gebruik map om een lijst met pokemon names te maken
    const pkmName = pkmNameURL.map((pokemon) => pokemon.name)

    // gebruik map om een lijst van fetch url's te maken
    const pkmURLs = pkmNameURL.map((pokemon) => pokemon.url)

    // https://hostman.com/tutorials/how-to-use-javascript-array-map/#example-3--applying-discounts-to-products
    // gebruik map om een fetch te doen op elke url in pkmURL
    const fetchPromises = pkmURLs.map(async (detailURL, index) => {
        const pkmDetailResp = await fetch(detailURL)
        const pkmDetails = await pkmDetailResp.json()

        // gebruik map om uit de pkmDetails de types te halen en op te slaan in een array
        const types = pkmDetails.types.map((pokemon) => pokemon.type.name)

        const speciesName = pkmDetails.species.name
       

        // https://www.javascripttutorial.net/javascript-return-multiple-values/#:~:text=Returning%20multiple%20values%20from%20a%20function%20using%20an%20object
        // hiermee kan ik javascript object terug geven, die ik met JSON.stringify tot JSON kan maken
        return {
            id: index + 1,
            spName: speciesName,
            types,
        }
    })

    // https://hostman.com/tutorials/how-to-use-javascript-array-map/#managing-asynchronous-operations
    // promise.all om de volgende fetch uit te voeren alleen als de vorige klaar is
    const pkmTypes = await Promise.all(fetchPromises)

    // gebruik de functie om de correcte structuur te maken
    const jsonStruc = structureJSON(pkmName, pkmTypes)

    // zet de structuur om naar JSON en sla het op in de cache
    fs.writeFileSync("cache.json", JSON.stringify(jsonStruc, null, 2))
}


// deze functie neemt de name, id en types van een pokemon, zet het samen en geeft het terug met een return
function structureJSON(names, pkmData) {
    pkmData.forEach((data, i) => {
        data.name = names[i],
        data.spriteAVIF = `/assets/sprites/avif/${i+1}.avif`
        data.spriteWEBP = `/assets/sprites/webp/${i+1}.webp`
    });

    return pkmData
}


async function changeCaught(userList, pkmId) {
    // url waar het pokemon id opgeslagen moet worden
    const postURL = "https://fdnd.directus.app/items/messages/"

    // fetch url met een filter om te zoeken naar het pokemon id,
    const checkPkm = await fetch(postURL + `?filter={"for":"${userList}","text":"${pkmId}"}`)
    const checkPkmResponseJSON = await checkPkm.json()
    // console.log(checkPkmResponseJSON.data[0].id)

    // if statement om te kijken als het id al in de lijst staat
    if (checkPkmResponseJSON.data.length > 0) {
        // als dat het geval is dan gebruiken we de id, die directus maakt, om het met delete uit de lijst te haalen
        // postURL + id geeft de json die delete moet worden terug
        await fetch(postURL + checkPkmResponseJSON.data[0].id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    // Voeg de nieuwe pokemon id toe aan de list in directus
    else {
        await fetch(postURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // de pokemon id slaan we op in de text
            body: JSON.stringify({
                for: 'vsheoPKM',
                text: pkmId,
            }),
        });
    }
}

// dit is een functie die een array maakt met alle bookmarked cadeau's
async function getBookmarks(list) {
	// haal alle items uit een lijst op, ik gebruik de for om aan te geven dat het voor mijn website bedoeldt is
	const yourList = `https://fdnd.directus.app/items/messages?filter={"for":"${list}"}`
	const yourListResponse = await fetch(yourList);
	const yourListResponseJSON = await yourListResponse.json()

	// pokemon id's uit "text" halen en maken tot een array
	const pkmIdArray = yourListResponseJSON.data.map( entry => entry.text );

	// return een array met alle pokemon id's
	return pkmIdArray;
}


// https://expressjs.com/en/starter/faq.html?utm_source#:~:text=How%20do%20I%20setup%20an%20error%20handler%3F
// error handling middle ware
app.use((error, request, response, next) => {
    console.log(error)
    response.status(500).render('error.liquid')
});

// als route niet bestaat (catch all error)
app.use((request, response) => {
    console.log(new Error("Page does not exist"))
    response.status(404).render('error.liquid')
});

// app.use((error, request, response, next) => {
//   response.status(error.status || 500).render('error.liquid');
// });

app.set("port", process.env.PORT || 8000)

app.listen(app.get("port"), function () {
    console.log(`Project draait via http://localhost:${app.get( "port" )}/`);
})
