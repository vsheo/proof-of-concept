import express from "express"
import { Liquid } from "liquidjs"
import fs from "fs"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");

// read de cache.json die lokaal staat
const cacheData = fs.readFileSync('cache.json', 'utf-8');
const cacheDataJSON = JSON.parse(cacheData);


// index GET
app.get("/", async function (request, response) {
    getIndexData()

    response.render("index.liquid", { pkmData: cacheDataJSON });
});


// get all names and generate id's
async function getIndexData() {
    // deze url heeft de 
	const nameURLResp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
	const nameURLRespJSON = await nameURLResp.json()
    const pkmNameURL = nameURLRespJSON.results

    // https://hostman.com/tutorials/how-to-use-javascript-array-map/
    // gebruik map om een lijst met pokemon names te maken
    const pkmName = pkmNameURL.map(pokemon => pokemon.name)

    // gebruik map om een lijst van fetch url's te maken
    const pkmURLs = pkmNameURL.map(pokemon => pokemon.url)

    // https://hostman.com/tutorials/how-to-use-javascript-array-map/#example-3--applying-discounts-to-products
    // gebruik map op een fetch te doen op elke url in pkmURL
    const fetchPromises = pkmURLs.map(async (detailURL, index) => {
        const pkmDetailResp = await fetch(detailURL)
        const pkmDetails = await pkmDetailResp.json()
        
        // gebruik map om uit de pkmDetails de types te halen, dit werkt(appart getest)
        const types = pkmDetails.types.map((pokemon) => pokemon.type.name)

        // https://www.javascripttutorial.net/javascript-return-multiple-values/#:~:text=Returning%20multiple%20values%20from%20a%20function%20using%20an%20object
        // hiermee kan ik javascript object terug geven, die ik met JSON.stringify tot JSON kan maken
        return  {
            id: index + 1,
            types
        };
    })

    // https://hostman.com/tutorials/how-to-use-javascript-array-map/#managing-asynchronous-operations
    // de rede waarom mijn json leeg was is omdat ik geen promise.all gebruikt had waardoor de volgende fetch uitgevoerd werd zonder dat de vorige klaar was
    const pkmTypes = await Promise.all(fetchPromises)

    // gebruik de functie om de correcte structuur te maken
    const jsonStruc = structureJSON(pkmName, pkmTypes)

    // zet de structuur om naar JSON en sla het op in de cache
    fs.writeFileSync('cache.json', JSON.stringify(jsonStruc, null, 2));
}

// deze functie neemt de name, id en types van een pokemon, zet het samen en geeft het terug met een return
function structureJSON(names, types) {
    // for (let i = 0; i < types.length; i++) {
    //     types[i].name1 = names[i]
    // }

    types.forEach((type, i) => {
        type.name = names[i]
    });

    return types
}


// detail GET
app.get("/detail", async function (request, response) {
    response.render("detail.liquid");
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
    console.log(
        `Project draait via http://localhost:${app.get(
            "port"
        )}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`
    );
});
