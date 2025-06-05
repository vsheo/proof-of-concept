import express from "express";
import { Liquid } from "liquidjs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");


// oude index GET, het werkt
// app.get("/", async function (request, response) {
//     const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
//     const pokemonResponseJSON = await pokemon.json();

//     // const pkmId = pokemonResponseJSON.filter((name) =>
//     //     pkmInfo = getPkmInfo(name)
//     // );

//     response.render("index.liquid", { pokeman: pokemonResponseJSON.results,  });
// });

// read de cache.json die lokaal staat
const cacheData = fs.readFileSync('cache.json', 'utf-8');
const cacheDataJSON = JSON.parse(cacheData);


// index GET
app.get("/", async function (request, response) {
    getIndexData()

    response.render("index.liquid", { pkmData: cacheDataJSON });
});


import fs from 'fs'

// get all names and generate id's
async function getIndexData() {
    // deze link, + de name heeft de id van de pokemon
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
        
        // gebruik map om uit de pkmDetails de types te halen
        const types = pkmDetails.types.map((pokemon) => pokemon.type.name)

        return types, index + 1
    })


    // sla de names op in de cache
    fs.writeFileSync('cache.json', JSON.stringify(pkmTypes, null, 2));
}




async function getPkmType() {
    // deze link heeft alle data van de pokemon, hieruit wil ik alleen de types halen
    const typesResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${cacheDataJSON[0].id}`);
	const typesRespJSON = await typesResp.json();
    const pkmNameUrl = typesRespJSON

    // const types = pkmNameUrl.types;
    const types = pkmNameUrl.types.map((typeObj) => ({
        type: typeObj.type.name
    }));

    fs.writeFileSync('cache.json', JSON.stringify(types, null, 2));
}


async function getIndexData() {
    const nameIdResp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    const nameIdRespJSON = await nameIdResp.json();
    const pkmList = nameIdRespJSON.results;

    // promise.all: wacht totdat alle async klaar zijn
    const resultList = await Promise.all(
        // map: ga door alle pokemon in de lijst en doe iets. | index is de positie van de pokemon in de array.
        pkmList.map(async (pkm, index) => {
            // uit de eerste fetch krijgen we pokemon name en een url naar details info van die pokemon
            const detailResp = await fetch(pkm.url);
            const detailRespJSON = await detailResp.json();

            const types = detailRespJSON.types.map((types) => types.type.name);

            return {
                // maak zelf een id door 1 op te tellen bij de index (zodat id overeen komt met de pokemon id)
                id: index + 1,
                // name van de pokemon
                name: pkm.name,
                // ||: betekent OR, als de eerste niet bestaat is het leeg
                type1: types[0] || null,
                type2: types[1] || null,
            };
        })
    );

    fs.writeFileSync("cache.json", JSON.stringify(resultList, null, 2));
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
