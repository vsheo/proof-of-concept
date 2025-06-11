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
const cacheData = fs.readFileSync("cache.json", "utf-8");
const cacheDataJSON = JSON.parse(cacheData)

// index GET
app.get("/", async function (request, response) {
    // 12 uur in milliseconden
    const twelveH = 43200000;
    const now = Date.now();

    // https://stackoverflow.com/questions/7559555/last-modified-file-date-in-node-js
    // check de laatste keer dat cache.json bewerkt was
    var stats = fs.statSync("cache.json")
    var mtime = stats.mtimeMs
    if (now - mtime < twelveH) {
        // console.log("cache is new")
    } else {
        getIndexData()
        // console.log("cache geupdate")
    }



    response.render("index.liquid", { pkmData: cacheDataJSON });
})

// app.get("/:name", async function (request, response) {
//     const pkmSearch = request.params.name;
//     // console.log(pkmSearch)

//     response.redirect('/');
// })

// detail GET
app.get("/:pkmName", async function (request, response) {
    const pkmName = request.params.pkmName;
    // console.log(pkmName)

    const pkmInfoResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmName}`)
    const pkmInfoRespJSON = await pkmInfoResp.json()
    // const pkmNameURL = nameURLRespJSON.results

    // RespJSON filter
    // const pkmStatsFiltered = {};
    const filters = ['abilities', 'stats', 'base_experience', 'weight', 'height', 'abilities']
    // filters.forEach(function(item) {
    //   pkmStatsFiltered[item] = pkmStatsRespJSON[item]
    // })

    response.render("detail.liquid", { pkmInfo: pkmInfoRespJSON })
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
        const types = pkmDetails.types.map((pokemon) => pokemon.type.name);

        // https://www.javascripttutorial.net/javascript-return-multiple-values/#:~:text=Returning%20multiple%20values%20from%20a%20function%20using%20an%20object
        // hiermee kan ik javascript object terug geven, die ik met JSON.stringify tot JSON kan maken
        return {
            id: index + 1,
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
function structureJSON(names, types) {
    types.forEach((type, i) => {
        type.name = names[i]
    });

    return types;
}

app.set("port", process.env.PORT || 8000)

app.listen(app.get("port"), function () {
    console.log(`Project draait via http://localhost:${app.get( "port" )}/`);
});
