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
    // deze moeten om de beurt gedaan worden omdat het voor nu beide in cache.json schrijft
    // de eerste is nodig om de 2de to doen
    // getPkmNameId()
    getPkmType()

    response.render("index.liquid", { pkmData: cacheDataJSON });
});


import fs from 'fs'

// get all names and generate id's
async function getPkmNameId() {
    // deze link, + de name heeft de id van de pokemon
	const nameIdResp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
	const nameIdRespJSON = await nameIdResp.json();
    const pkmNameId = nameIdRespJSON.results

    // gebruik map om de name van elke pokemon op te slaan in een list
    const nameIds = pkmNameId.map((pkm, index) => ({
        id: index + 1,
        pkm
    }));

    // sla de names op in de cache
    fs.writeFileSync('cache.json', JSON.stringify(nameIds, null, 2));
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
