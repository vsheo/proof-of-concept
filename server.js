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



// index GET
app.get("/", async function (request, response) {
    const ffff = getPkmData()

    response.render("index.liquid", { pokeman: ffff });
});


import fs from 'fs'

// get all names
async function getPkmData() {
    // deze link, + de name heeft de id van de pokemon
	const indexDataResp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
	const indexDataRespJSON = await indexDataResp.json();
    const pkmNameUrl = indexDataRespJSON.results

    // gebruik map om de name van elke pokemon op te slaan in een list
    const nameList = pkmNameUrl.map(pokemon => pokemon.name);

    // sla de names op in de cache
    fs.writeFileSync('cache.json', JSON.stringify(nameList, null, 2));

	// return nameList;
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
