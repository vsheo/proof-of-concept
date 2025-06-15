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
### Routes
### Routes

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

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
