import express from "express"
import { Liquid } from "liquidjs"
import fs from "fs"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const engine = new Liquid()
app.engine("liquid", engine.express())
app.set("views", "./views")

// read de cache.json die lokaal staat
const cacheData = await fs.readFileSync("cache.json", "utf-8");
const cacheDataJSON = JSON.parse(cacheData)


// index GET
app.get("/", async function (request, response) {
    // 12 uur in milliseconden
    const twelveH = 43200000;
    const now = Date.now();

    // https://stackoverflow.com/questions/7559555/last-modified-file-date-in-node-js
    // check de laatste keer dat cache.json bewerkt was
    var stats = await fs.statSync("cache.json")
    var mtime = stats.mtimeMs
    if (now - mtime < twelveH) {
        console.log("cache is new")
    } else {
        getIndexData()
        console.log("cache geupdate")
    }

    // all caught pokemon
    const caughtList = await getBookmarks("vsheoPKM")
    // console.log(caughtList)

    response.render("index.liquid", { pkmData: cacheDataJSON, pkmCaught: caughtList, pageTitle: "All Pokemon" });
})

// index POST
app.post("/toggle-caught/:pkmId", async function (request, response) {
    const id = request.params.pkmId;
    // change if pokemon is caught
    await changeCaught("vsheoPKM", id)
    // console.log(id)

    response.redirect('/');
})

// index Gen filter
app.get("/pokemon/generation-:number", async function (request, response) {
    const gen = request.params.number;
    const pkmGeneration = [0, [0,151], [152,251], [252,386], [387,493], [494,649], [650,721], [722,809], [810,905], [906,1025]]
    const genData = cacheDataJSON.filter(pkm => pkm.id >= pkmGeneration[gen][0] && pkm.id <= pkmGeneration[gen][1])

    // all caught pokemon
    const caughtList = await getBookmarks("vsheoPKM")

    response.render("index.liquid", { pkmData: genData, pkmCaught: caughtList, gen: gen, pageTitle: "Generation "+gen });
})

// index search
app.get("/search", async function (request, response) {
    const searchName = request.query.query;

    const findPkmData = cacheDataJSON.filter(pokemon =>
        pokemon.name.includes(searchName.toLowerCase())
    );

    response.render("index.liquid", { pkmData:findPkmData });
});

// index caught filter
app.get("/pokemon/caught", async function (request, response) {
    // all caught pokemon
    const caughtList = await getBookmarks("vsheoPKM")

    // get all caught pokemon data
    const caughtData = cacheDataJSON.filter(pkm =>
        caughtList.includes(pkm.id.toString())
    );

    response.render("index.liquid", { pkmCaught: caughtList, pkmData: caughtData, pageTitle: "Pokemon caught" });
})

// detail GET
app.get("/details/:pkmName", async function (request, response) {
    const pkmName = request.params.pkmName;

    // pokemon details and stats
    const pkmInfoResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmName}`)
    if (!pkmInfoResp.ok) {
        const error = await pkmInfoResp.text()
        console.error(`Failed to fetch Pokémon "${pkmName}". Status: ${pkmInfoResp.status}. Response: ${error}`)
        return 
    }
    const pkmInfoRespJSON = await pkmInfoResp.json()

    // gebruik pkm name en zoek pkm id in cache.json
    const findPkmInfo = cacheDataJSON.find(pokemon => pokemon.name === pkmName).id;

    // in deze url vind je de link naar data voor de evolution-chain. hier vind je de 
    const getEvoChain = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${findPkmInfo}`)
    const evoChain = await getEvoChain.json()

    // fetch evolution chain
    const getEvoData = await fetch(evoChain.evolution_chain.url)
    const evoData = await getEvoData.json()

    // split de url van evolution-chain om id te krijgen, voor elke stage
    const basicId = evoData.chain.species.url.split('/')[6]
    // console.log(basicId)

    let stageOneId = [];
    let stageTwoId = [];

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
    console.log(caughtList)

    response.render("detail.liquid", { pkmData: cacheDataJSON, pkmInfo: pkmInfoRespJSON, evolutions: evoData, basicId: basicId, stageOneIds: stageOneId, stageTwoIds: stageTwoId, pkmCaught: caughtList })
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

        // gebruik map om uit de pkmDetails de types te halen
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
        data.name = names[i]
    });

    return pkmData;
}

async function changeCaught(userList, pkmId) {
    // url waar het pokemon id opgeslagen moet worden
    const postURL = "https://fdnd.directus.app/items/messages/";

    // filter om te zoeken naar het pokemon id,
    const checkPkm = await fetch(postURL + `?filter={"for":"${userList}","text":"${pkmId}"}`);
    const checkPkmResponseJSON = await checkPkm.json();
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
	// haal alle items uit een lijst op, ik gebruik de for om aan te geven dat het voor mijn pagina is
	const yourList = `https://fdnd.directus.app/items/messages?filter={"for":"${list}"}`;
	const yourListResponse = await fetch(yourList);
	const yourListResponseJSON = await yourListResponse.json();

	// alle pokemon id's uit "text" maken tot een array
	const pkmIdArray = yourListResponseJSON.data.map(
		entry => entry.text
	);

	// return een array met alle pokemon id's
	return pkmIdArray;
}

app.set("port", process.env.PORT || 8000)

app.listen(app.get("port"), function () {
    console.log(`Project draait via http://localhost:${app.get( "port" )}/`);
});
