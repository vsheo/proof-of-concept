# Poké-app
<!-- Geef je project een titel en schrijf in één zin wat het is -->
Een Pokédex website waarop je informatie, statistieken en evoluties van Pokémon kunt bekijken

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
    * [HTML](#HTML)
      * [Index](#Index)
      * [Details](#Details)
    * [Liquid](#Liquid)
      * [breadcrumbs nav](#breadcrumbs-nav)
      * [Dynamische background colors](#Dynamische-background-colors)
    * [CSS](#CSS)
      * [Styleguide](#Styleguide)
      * [View transition](#View-transition)
      * [Detail - Tabs](#Detail---Tabs)
    * [JavaScript](#JavaScript)
      * [loading animation](#loading-animation)
      * [Prevent Default - Search](#Prevent-Default---Search)
    * [Server](#Server)
      * [Routes](#Routes)
      * [Functies](#Functies)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->
![poster-home](https://github.com/user-attachments/assets/26adb04b-6e91-4329-a884-2b4753a6678b)
[live website](https://proof-of-concept-rn2l.onrender.com/)

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
User story:
Als bezoeker van de Poké-app
wil ik een overzichtelijke website waarop ik alle Pokémon kan bekijken, met de mogelijkheid om eenvoudig te navigeren, te zoeken en per Pokémon de details te bekijken.

Wat kun je doen op de Poké-app website?
- de search bar gebruiken om een specifieke Pokémon te zoeken
- op de Pokéball klikken om een Pokémon aan je caught lijst toe te voegen. Deze lijst kun je bekijken op de de filter "Caught Pokémon" te klikken
- op een Pokémon kaart klikken om naar de detail pagina te gaan
- op de detail pagina kun je de statistieken en evolutions van de geselecteerde Pokémon bekijken

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
## HTML
### Index
### Details





## Liquid
### breadcrumbs nav
### Dynamische background colors





## CSS
### Styleguide
### View transition
### Detail - Tabs





## JavaScript
### loading animation
### Prevent Default - Search





## Server
### Functies
#### Functies - getIndexData
Deze functie wordt gebruikt op de index pagina en haalt voor alle Pokémon de volgende gegevens op: de naam, ID, species name en types. De opgehaalde data wordt opgeslagen in een lokaal JSON bestand genaamd cache.json.
De reden hiervoor is dat er momenteel 1025 Pokémon bestaan. Als al deze gegevens bij elke pagina refresh opnieuw van de API zouden worden opgehaald, zou dit leiden tot lange laad tijden.
Daarom voert deze functie alle benodigde fetch verzoeken in een keer uit en slaat het resultaat op. Deze cache wordt één keer per 12 uur vernieuwd. Hierdoor is de website bij de eerste opstart traag, maar bij volgende bezoeken wordt de data lokaal geladen, wat zorgt voor een veel snellere laad tijden.

De functie begint met het ophalen van alle Pokémon data van deze fetch URL: https://pokeapi.co/api/v2/pokemon?limit=1025
De response van deze fetch wordt direct omgezet naar JSON.
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L142-L146
We krijgen hiermee een lijst met alle Pokémon namen, samen met een URL die verwijst naar een ander JSON met meer detail informatie over de Pokémon
```JSON
"results": [
{
"name": "bulbasaur",
"url": "https://pokeapi.co/api/v2/pokemon/1/"
},
```
We hebben de namen van alle Pokémon nodig, dus maken we met behulp van `map()` een array die alleen de Pokémon namen heeft.

`map()` is heel handig omdat het als een for loop door `pkmNameURL` gaat en een functie uitvoert op elk item in de array. En de resultaten worden in een nieuwe array opgeslagen.
[meer info over map()](https://hostman.com/tutorials/how-to-use-javascript-array-map/)
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L150

We gebruiken `map()` opnieuw om een array te maken met alle `url` van de Pokémon
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L153

In de array pkmURLs staat nu een lijst met alle URL’s die verwijzen naar pagina’s met meer detail informatie over elke Pokémon: bijvoorbeeld: https://pokeapi.co/api/v2/pokemon/1/
Op deze pagina’s staan de types van de Pokémon. Om de types van alle Pokémon op te halen, moeten we eerst een fetch uitvoeren op elke URL uit de lijst.
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L157-L159

Daarna kunnen we weer map() gebruiken om de types op te slaan in een array
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L162

In deze Pokémon details staat ook de species name.
Meestal komen de name en de species name overeen, maar soms verschilt het bijvoorbeeld bij de name staat "giratina-altered" en in de species name staat alleen "giratina".
We halen ook de species name op om deze op de website weer te geven.
In de PokéAPI kun je niet filteren op species name, maar wel op name.
Daarom gebruiken we de name alleen voor de backend (in server.js), terwijl de species name voor op de website wordt gebruikt.
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L164

Uit de pkmURLs hebben we nu een array met de types en species name van elke Pokémon. Deze gegevens kunnen we met return teruggeven als een JavaScript object (en later met JSON.stringify omzetten naar JSON).
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L157-L174

Om ervoor te zorgen dat elke fetch eerst wordt afgerond voordat de volgende wordt uitgevoerd, moeten we await zetten om de hele functie:
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L176-L178

fetchPromises geeft nu dit terug:
```JSON
[
  {
    "id": 1,
    "spName": "bulbasaur",
    "types": [
      "grass",
      "poison"
    ]
  },
```

Wat we nu nog nodig hebben, zijn alleen de namen, die we al in de array (pkmName) hebben staan.
Om de namen toe te voegen aan de JSON structuur die fetchPromises(pkmTypes) teruggeeft, heb ik een nieuwe functie geschreven.
Deze functie neemt de pkmTypes (waarin nu ook de species name staan, deze was later toegevoegd) en de pkmName array en voegt ze samen
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L181
https://github.com/vsheo/proof-of-concept/blob/91f460a5eca511b8ff5c7cd1320844b17e8c175f/server.js#L188-L193


Nu dat we al deze data samen hebben, slaan we die op in een lokaal JSON bestant
https://github.com/vsheo/proof-of-concept/blob/b4cabe896cba3240dad86f1b4dc123499dd5868e/server.js#L184





#### Functies - structureJSON
Deze functie neemt een array met Pokémon data (de pkmTypes: id, types en species name) en voegt aan elk JavaScript object een nieuw veld toe (de name van de pokemon)
en geeft de nieuw structuur terug via de return.
https://github.com/vsheo/proof-of-concept/blob/431a26b798248a4e54fa282bba2c67b20b8196a1/server.js#L188-L194

De Data ziet er nu zo uit:
```JSON
[
  {
    "id": 1,
    "spName": "bulbasaur",
    "types": [
      "grass",
      "poison"
    ],
    "name": "bulbasaur"
  },
```




#### Functies - changeCaught
Deze functie maakt het mogelijk om een Pokémon op te slaan in een lijst.
Dit gebeurt door het Pokémon id en een naam (bijvoorbeeld een gebruikers naam of lijst naam) op te slaan in Directus.

Het ID is nodig om later terug te vinden welke Pokémon is opgeslagen, en de naam is nodig om in Directus te kunnen filteren op alle Pokémon in een bepaalde lijst.

Directus heeft hiervoor geen speciaal URL, maar omdat het zo eenvoudig is, kunnen we "misbruik" maken van: https://fdnd.directus.app/items/messages/
Dit structuur ziet er zo uit:
```JSON
{
"data": [
    {
        "id": 102,
        "created": "2025-02-25T18:47:54.749Z",
        "from": "Systeem",
        "text": "marcinma is ingelogd!",
        "for": "Team Hype"
    },
```

Het veld `for` wordt gebruikt om de lijstnaam op te slaan, lijst naam: vsheoPKM
Het veld `text` wordt gebruikt om de Pokémon id op te slaan

In deze functie beginnen we met een fetch op het Pokémon id dat wordt meegegeven via de POST route.
In deze POST route wordt ook de userList meegegeven, in dit geval: vsheoPKM. Voor nu is er maar een lijst
https://github.com/vsheo/proof-of-concept/blob/431a26b798248a4e54fa282bba2c67b20b8196a1/server.js#L198-L202

De response ziet er zo uit wanneer de Pokémon id al in de lijst staat:
```JSON
{
    "data": [
        {
            "id": 1416,
            "created": "2025-06-13T06:58:54.032Z",
            "from": null,
            "text": "4",
            "for": "vsheoPKM"
        }
    ]
}
```
En zo ziet de response eruit als de Pokémon nog niet is opgeslagen:
```JSON
{
    "data": []
}
```

Met een if-statement kunnen we controleren of de `data` array meer dan een item bevat.
Als dat waar is, betekent het dat de Pokémon id al is opgeslagen.
In dat geval kunnen we de Pokémon uit de lijst halen met een DELETE
https://github.com/vsheo/proof-of-concept/blob/431a26b798248a4e54fa282bba2c67b20b8196a1/server.js#L206

Voor het uitvoeren van een DELETE hebben we de id uit `data.id` nodig.
Deze id wordt automatisch gegenereerd door Directus wanneer er iets wordt opgeslagen.
We hebben deze unieke id nodig om het juiste item uit de lijst te kunnen verwijderen.

de `postURL` + `data.id` geeft maar 1 item terug, de pokemon die we uit de lijst moeten verwijderen.
voorbeeld URL: https://fdnd.directus.app/items/messages/1522
https://github.com/vsheo/proof-of-concept/blob/431a26b798248a4e54fa282bba2c67b20b8196a1/server.js#L209-L215

Als de data in de response leeg is, betekent dit dat de Pokémon nog niet in de lijst staat.
In dat geval slaan we de Pokémon op in de lijst door een POST te doen op de `postURL`.
Hier geven we de lijst naam(`vsheoPKM`) mee in het veld `for`, en de Pokémon id(`pkmId`) in het veld `text`
https://github.com/vsheo/proof-of-concept/blob/431a26b798248a4e54fa282bba2c67b20b8196a1/server.js#L218-L230





#### Functies - getBookmarks
Deze functie haalt alle 





### Routes
#### Routes - Index




## Installatie
- Download de nieuwste versie van Node.js (https://nodejs.org/en) op je laptop of computer.
- Fork deze repository en Clone jouw fork naar je laptop
- Open de repository in Visual Studio Code (of een andere code editor)
- open de terminal in vscode en instaleer node in de repository:
```
npm install
npm install -D nodemon
```
- controleer als de deze code hebt staan in package.json:"
```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
- Zodra de installatie klaar is, voer je het volgende commando uit om de website op localhost te starten
    - Voor gewone start, met deze moet je handmatig de server opnieuw opstarten bij wijzigingen:
    ``` npm start ```
    - Als je de server start met nodemon, dan wordt de server automatisch opnieuw gestart bij wijzigingen in server.js:
    ``` npm run dev ```
- Na het starten zie je in de terminal een localhost-link. Klik erop of open deze in je browser
- als je de server wilt stoppen dan kan dat met deze command:
``` Ctrl + C ```

## Bronnen
[Map() tutorials](https://hostman.com/tutorials/how-to-use-javascript-array-map/#example-3--applying-discounts-to-products)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
