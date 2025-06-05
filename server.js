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

    // gebruik map om een lijst met pokemon names te maken
    const pkmName = pkmNameURL.map(pokemon => pokemon.name)

    // gebruik map om een lijst van fetch url's te maken
    const pkmURL = pkmNameURL.map(pokemon => pokemon.url)

    // gebruik map op een fetch te doen op elke url in pkmURL
    const pkmTypes = pkmURL.map(async (detailsURL, index) => {
        const pkmDetailsResp = await fetch(detailsURL)
        const pkmDetails = await pkmDetailsResp.json()
        
        // gebruik map om uit de pkmDetails de types te halen, dit werkt(appart getest)
        const types = pkmDetails.types.map((pokemon) => pokemon.type.name)

        return types, index + 1
    })

    // sla de names op in de cache, dit werkt
    // fs.writeFileSync('cache.json', JSON.stringify(pkmName, null, 2));

    // check de list met fetch urls, dit werkt
    fs.writeFileSync('cache.json', JSON.stringify(pkmURL, null, 2));

    // sla de pokemon types op in de cache, dit werkt niet
    // fs.writeFileSync('cache.json', JSON.stringify(pkmTypes, null, 2));
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
