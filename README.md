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
      * [Functies](#Functies)
      * [Routes](#Routes)
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
## Code conventies
### Naamgeving
- Namen zijn zo kort mogelijk, maar nog steeds beschrijvend waarvoor het bedoeld is
- HTML en CSS class names zijn altijd in kleine letters, met `-` tussen woorden
- in HTML en CSS gebruik ik namen die aangeven wat het element is
Bijvoorbeeld, dit geeft aan dat het gaat om een container voor Pokémon
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/index.liquid#L36
En deze geeft aan dat het gaat om een kaartje voor de Pokémon
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/index.liquid#L39
Deze verwijst naar filters voor Pokémon
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/index.liquid#L15

- JavaScript namen hebben camelCase naamgeving: alle woorden aan elkaar vast, eerste woord met kleine letter, volgende woorden met hoofdletter
  Voorbeelden van JavaScript namen, Deze geeft aan dat het een lijst is van alles wat caught is
  https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/server.js#L86
  Deze functienaam geeft aan dat je iets kunt veranderen als iets caught is
  https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/server.js#L228
- Liquid heeft ook camelCase naamgeving

 

### HTML
- In de HTML worden inline elementen op een regel geschreven, ook als het gaat om bijvoorbeeld een <h2> met een afbeelding en een tekst erin (de tekst wordt in een span geschreven)
https://github.com/vsheo/proof-of-concept/blob/0d7d10d53a93e092e325ab098389c94350fb1fd6/views/index.liquid#L16
- block elementen krijgen een lege regel erboven en eronder
voorbeeld van een block element:
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/index.liquid#L15-L31
- Liquid for loops en if/else statements worden een tab verder ingedent, en de HTML elementen binnen deze blokken worden nog een tab verder ingesprongen
voorbeeld:
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/detail.liquid#L85-L93





### CSS
- CSS selectors hebben dezelfde volgorde als in HTML
- Block elementen in HTML zijn genest in CSS
- De CSS nesting gaat niet dieper dan drie lagen (de eerste laag is de eerste selector die genest staat)
- bij nesten is er een lege regel boven de geneste selector
- Media queries staan altijd genest bij het element waarvoor ze bedoeld zijn

voorbeeld HTML block in in CSS genest
https://github.com/vsheo/proof-of-concept/blob/d0442e8c288f9f5501f73ac3fbcc6a63cc1e1ed8/views/index.liquid#L39-L63
https://github.com/vsheo/proof-of-concept/blob/d0442e8c288f9f5501f73ac3fbcc6a63cc1e1ed8/public/styles/style.css#L159-L289
 
CSS properties zijn gegroepeerd:<br>
eerst layout en positie van het element en de child elementen:
- display
- position (met top, left, enzovoort er direct onder)

Daar onder positie van de child elementen:
- align
- justify
- place

daarna komt de height en width van het element
- Height
- width

Daarna alles dat met kleur of achtergrond te maken heeft:
- background-color
- color
- background

Daarna alles dat met typografie te maken heeft:
- font-size
- font-weight
- line-height

Daarna komen de margins en paddings:
- Padding en margins schrijf ik op een regel, tenzij slechts maar kant wordt gebruikt, dan gebruik ik bijvoorbeeld margin-left.
Hier komen de overige, minder gebruikte properties
- Als laatste komt z-index

binnen deze groepen staan de properties een beetje door elkaar, tenzij 2 of meerdere properties samen nodig zijn
zoals:
display grid met grid-template-columns, grid-template-rows en grid-template-areas
hetzelfde voor display flex
en als position gebruikt wordt dan is left right top of bottom gelijk eronder





### JavaScript
- ik gebruik tabs, die ingesteld zijn op 4 spaties
- code zoveel als mogelijk op 1 regel doen
nadat de pokemon is gevonden haal ik alleen de id daarui(wat ik nodig heb)
https://github.com/vsheo/proof-of-concept/blob/5954516dbe2fbd706d3db72dce24aea68f726cb9/server.js#L125
hier zet ik variables gelijk in een link
https://github.com/vsheo/proof-of-concept/blob/5954516dbe2fbd706d3db72dce24aea68f726cb9/server.js#L231
- code in functies zijn altijd 1 tab verder ingedent
https://github.com/vsheo/proof-of-concept/blob/5954516dbe2fbd706d3db72dce24aea68f726cb9/server.js#L218-L224





## HTML
### Index
### Details





## Liquid
### liquid assign
Op verschillende plekken in mijn code heb ik assign gebruikt, meestal om variabelen aan te maken.
In dit geval gebruik ik het om een integer om te zetten naar een string.
`pkm.id` uit de database is een integer en `pkmCaught` is een string.
Met Liquid zet ik de integer eerst om naar een string, zodat ik daarna twee waarden met elkaar kan vergelijken.
https://github.com/vsheo/proof-of-concept/blob/7a7e0164d7eb408d732700fb24be7875ddc213c8/views/index.liquid#L45-L48


### breadcrumbs nav
Voor de breadcrumb nav heb ik een aparte Liquid partial gemaakt.
In deze nav gebruik ik if statements om te kijken welke variabelen er zijn.
afhankelijk daarvan wordt bepaald welke links in de breadcrumb nav laat zien.
https://github.com/vsheo/proof-of-concept/blob/7a7e0164d7eb408d732700fb24be7875ddc213c8/views/partials/breadcrumb.liquid#L1-L20

Deze partial wordt op de index pagina en de detail pagina ingeladen met render.
Bij het inladen geef ik variabelen mee om aan te geven op welke pagina de gebruiker zich bevindt.
Op basis van deze variabelen toont de breadcrumb nav de juiste linkjes.
render op index.liquid
https://github.com/vsheo/proof-of-concept/blob/7a7e0164d7eb408d732700fb24be7875ddc213c8/views/index.liquid#L3
render op details.liquid
https://github.com/vsheo/proof-of-concept/blob/7a7e0164d7eb408d732700fb24be7875ddc213c8/views/detail.liquid#L2





### Dynamische background colors
Op de index pagina hebben de Pokémon kaartjes allemaal dezelfde achtergrond,
alleen de kleur verschilt per Pokémon type.

In pokeapp.css heb ik custom properties gemaakt voor de kleuren: --color- + 'de pokémon type'
De naam van de Pokémon type in de custom property komt overeen met de naam van de Pokémon type in de database.

De svg’s hebben op twee plaatsen een fill color.
Met Liquid maak ik een variabele `type`. Deze krijgt de naam van het eerste type van een Pokémon (een Pokémon kan maximaal twee types hebben),
en ik gebruik die variabele om beide fill color plekken in de svg in te vullen.
https://github.com/vsheo/proof-of-concept/blob/8f8c766fcbd62cd3e7782b4aa05e0ab814802e5d/views/index.liquid#L40-L41

Voor de background svg op de detail pagina heb ik in Figma alleen het witte gedeelte geselecteerd en daar een  svg van gemaakt.
Daardoor hoef ik alleen de background color aan te passen aan de Pokémon type kleur. De svg zelf hoeft niet meer aangepast te worden.
Hierdoor kan ik de SVG als een background-image met een URL inladen, in plaats van de svg in de HTML te zetten.
https://github.com/vsheo/proof-of-concept/blob/8f8c766fcbd62cd3e7782b4aa05e0ab814802e5d/views/detail.liquid#L5




## CSS
### Styleguide
De styleguide gebruik ik alleen voor kleuren en fonts.

De custom properties voor kleuren, font-sizes en font-weights heb ik op de body aangemaakt. Hierdoor kan ik ze ook in mijn andere stylesheet gebruiken.
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L10-L56

De primary font-family, font-weight en font-size heb ik op de body geplaatst, zo is het gelijk op alle tekst van de pagina
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L81-L85

Daarna heb ik classes aangemaakt voor titels en subtitels.

primary-h3-home<br>
Deze class gebruik ik voor de namen van de Pokémon op de index pagina (op de Pokémon kaartjes)
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L87-L90

primary-txt-detail<br>
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L92-L95

title-page<br>
Voor de titels op de home en detail pagina.
https://github.com/vsheo/proof-of-concept/blob/cf1818df527b4414dae92b5c776e22044fbb6738/public/styles/pokeapp.css#L97-L100

title-detail<br>
Voor de naam van de Pokémon/de titel van de detail pagina.
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L102-L105

detail-info<br>
Voor de tekst in de tabs op de detail pagina.
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L107-L110

En deze gebruik ik om de standaard styling van links te resetten.
https://github.com/vsheo/proof-of-concept/blob/2a73c052bf4e5807b5eeaa15a58611a5b116dea1/public/styles/pokeapp.css#L112-L115

Ik heb ook responsive font sizes gemaakt met `clamp()`.
Deze gebruik ik alleen voor titels op de mobiele en tablet versies van de website.
Zo zijn de titels groter als het scherm breeder is.
https://github.com/vsheo/proof-of-concept/blob/cf1818df527b4414dae92b5c776e22044fbb6738/public/styles/pokeapp.css#L45
https://github.com/vsheo/proof-of-concept/blob/cf1818df527b4414dae92b5c776e22044fbb6738/public/styles/pokeapp.css#L47
https://github.com/vsheo/proof-of-concept/blob/cf1818df527b4414dae92b5c776e22044fbb6738/public/styles/pokeapp.css#L49


In het design wordt Rubik font gebruikt.
Ik ben door het hele design gegaan en zag dat alleen de font-weight versies 400, 500 en 600 gebruikt worden.
Daarom laad ik alleen deze drie in, zodat de website sneller is en er geen ongebruikte fonts worden gedownload.
https://github.com/vsheo/proof-of-concept/blob/cf1818df527b4414dae92b5c776e22044fbb6738/public/styles/pokeapp.css#L58-L77





### View transition
De view transition vindt plaats op de index pagina wanneer search bar gebruikt wordt.

https://github.com/user-attachments/assets/40c7a95f-dcdc-4817-b53c-1ce3bc7d4a70

In de CSS heeft de navigatie `view-transition {navigation: auto;}` dit zorgt er automatisch voor dat de Pokémon kaartjes naar boven sliden nadat een search request submit wordt.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L1-L3

Elke Pokémon kaart heeft een unieke id nodig voor de view transition.
Hiervoor gebruik ik Liquid om deze id’s te genereren met behulp van de Pokémon id uit de database.
https://github.com/vsheo/proof-of-concept/blob/8f33d5b7f865650751e04fd03fdec71ba7cfa9eb/views/index.liquid#L39

Omdat ik `preventDefault()` gebruik nadat een search request submit wordt, moet ik nu zelf de view transition aanroepen voordat de search results worden weergegeven
https://github.com/vsheo/proof-of-concept/blob/8f33d5b7f865650751e04fd03fdec71ba7cfa9eb/public/main.js#L66-L68

De slide animatie, de fade in en fade out worden automatisch aangemaakt door de browser en de `@View-transition`.





### Detail - Tabs
Op de detail pagina zijn er drie tabs die informatie over de Pokémon weergeven.
Dit is gemaakt met CSS door gebruik te maken van id’s op de elementen, anker tag elemenmten die naar deze id’s toe gaan en de `:target` pseudo class.

https://github.com/user-attachments/assets/101f037f-605f-4739-aa53-aa7073246a0a

In HTML heb ik een nav met 3 links, een voor elke tab. Daarnaast heb ik twee div's. een voor de grijze achtergrond en een tweede voor een bar die meebeweegt naar de tab open staat
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/views/detail.liquid#L43-L49

Op de containers van deze elementen heb ik id’s. dit is waar de links in de nav naar toe gaan
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/views/detail.liquid#L51
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/views/detail.liquid#L83
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/views/detail.liquid#L93

Voor de layout gebruik ik een grid.
De twee div's plaats ik in dezelfde grid area, zodat ze op elkaar komen te staan.
De 3 links geef ik geen grid area mee, die worden vanzelf in de juiste grid-cellen geplaatst.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L312-L319

De links in de grid cel geef ik 100% height en width, zodat je niet alleen op de tekst hoeft te klikken om van tab te veranderen, maar ook eromheen.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L329-L333

De grijze bar krijgt de breedte van alle drie de grid cellen
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L346-L349

De paarse indicator krijgt ook de totale breedte van alle drie de grid cellen, maar een width van 33%.
Op de grid heb ik `place-items: center`, zodat de tekst, bar en de indicator in het midden van elke grid cel worden geplaatst.
Hierdoor begint de indicator ook in de middelste grid cel.
Daarom hebben we een translate om de indicator naar links te verschuiven, zodat deze bij de eerste tab ("about") begint.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L351-L357

Om de content te laten veranderen wanneer er op een tab geklikt wordt, gebruiken we eerst de combinaties van `:not` en `:target` om alle elementen die niet de target zijn, op `display: none` te zetten.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L363-L365

Nu staan alle 3 tabs op display: none.
We gebruiken `:target` om de tab die nu actief is (deze zie je terug in de URL) op `display: block` te zetten.
(in pkm-about gebruik ik een grid voor de layout, dus `display: block` haalt die layout weg. hier zet ik `display: grid` terug zodra de tab about actief is)
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L367-L373


Nu hebben we tabs die van content veranderen wanneer er op een link geklikt wordt.
Maar als je voor het eerst op de detail pagina komt, zijn alle tabs op `display: none`, omdat er nog geen target is.
Om dit probleem op te lossen, heb ik op de index pagina,in de link naar de detail pagina, aangegeven dat `#about` gelijk de target is.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/views/index.liquid#L42

Nu komen we op een detail pagina waar about meteen de target is, en de andere twee tabs op display: none staan

Om de indicator mee te laten bewegen, gebruiken we `:has` samen met `:target`
We gebruiken `:has` op de container die alle 3 tabs heeft, de info-container.
Als de info-container, pkm-about heeft dat de target is, dan verplaatsen we de indicator naar links.
https://github.com/vsheo/proof-of-concept/blob/1358e4a3dfa8b4ac2c9e56e1e6f4ce76b516546b/public/styles/style.css#L376-L378

Dit doen we ook wanneer pkm-stats of pkm-evolution de target is.





## JavaScript
### loading animation
Op de hoofdpagina kun je Pokémon toevoegen aan je "Caught Pokémon" lijst.
Dit doe je door op het Pokéball icon te klikken, dat normaal grijs is. Zodra je hierop klikt, wordt de Pokémon toegevoegd aan je "Caught Pokémon" lijst. Met prevent Default stop ik de pagina refresh. In plaats daarvan verschijnt er een draaiende Pokéball animatie totdat de Pokémon is toegevoegd aan je lijst. Daarna stopt de animatie en zie je een ingekleurde Pokéball.

https://github.com/user-attachments/assets/de41020d-dec8-41ec-b4ad-7cfa4ac79167

Deze JavaScript-code wordt alleen uitgevoerd als je browser fetch requests en DOMParser ondersteunt.
Als dit ondersteunt wordt, dan luistert JavaScript naar het submit event op de website. Het element waarop de submit plaatsvindt, wordt opgeslagen in een variabele.
Deze variabele is de form die submit wordt.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L4-L6

Daarna controleren we of het formulier het `data-enhanced` attribuut heeft.
Het `data-enhanced` attribuut is een unieke id, die later nodig is om precies dit element terug te vinden en te vervangen door een nieuwe versie.(pokeball grijs of ingekleurd)
Als het formulier geen `data-enhanced` attribuut heeft, stopt de code hier.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L13-L14

Op deze website zijn er twee soorten submit events.
Als het submit event komt van een element met de class `pkm-pokeball`, gaat de code verder, anders stopt de code.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L13

Nu we hebben gecontroleerd waar dit submit event vandaan komt, weten we dat het bedoeld is om een Pokémon toe te voegen aan de lijst 'Caught Pokémon'.
De browser wil nu de pagina refreshen om de nieuwe state van het Pokéball icon te laten zien, maar dit stoppen we met `preventDefault()`.
In plaats van een refresh laten we het Pokéball icon draaien door er een extra class aan toe te voegen.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L14-L17

Daarna voeren we een fetch uit naar de URL die in de action van de form staat. om de POST te verwerken op de server.
`method: form.method` betekent dat de methode wordt ingesteld op de waarde die in het method attribuut van het formulier in de HTML staat.
in dit geval is dat POST
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L19-L22

De response zou normaal vanzelf als HTML in de pagina geladen worden. Maar omdat we `preventDefault()` gebruiken, moeten we dit nu zelf doen.
We zetten de response eerst om naar text.
Die text kunnen we met DOMParser omzetten naar HTML.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L24-L27

De responseDOM bevat de HTML van de hele pagina.
Maar wij hebben alleen het element nodig dat het unieke data-enhanced attribuut van de form bevat
Daarom zoeken we in de nieuwe DOM specifiek naar dat element.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L29-L31

We hebben de POST verwerkt en de nieuwe HTML staat nu in de variabele `newState`.
Nu kunnen we de loading animatie stoppen door de class van het element weg te halen.
Daarna vervangen we het oude form met de nieuwe form uit `newState`.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L33-L35





### Prevent Default - Search
Op de hoofdpagina kun je de search bar gebruiken om naar Pokémon te zoeken. Ook hier gebruik ik `preventDefault()` om de refresh van de pagina te stoppen en haal ik met een client side fetch de new state van de pagina op.
De search results worden daarna met een view transition op de pagina weergegeven.

https://github.com/user-attachments/assets/fa34efca-1968-48a3-b814-746460be38d4

Deze client side fetch werkt grotendeels hetzelfde als die van de loading animation.
Het verschil is dat we hier controleren of het submit event van de search bar komt.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L46-L47

Daarna maken we zelf de URL voor de search request, dit wordt normaal door de browser gedaan.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L50

Op deze URL voeren we een GET request uit.
De response zetten we daarna weer om in HTML.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L52-L59

Ook deze response bevat de HTML van de hele pagina.
Maar wij willen alleen de new state van de pkm-container.
Normaal bevat deze container alle Pokémon kaartjes, maar in de new state staan alleen de search results in.

We gebruiken deze keer geen `data-enhanced` attribuut, omdat er maar een pkm-container is.
In de huidige DOM selecteren we de pkm-container, en ook in de nieuwe DOM, die we uit de response halen, selecteren we dezelfde pkm-container.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L61-L64

Om de nieuwe staat van de container weer te geven, is het vervangen van de oude met de nieuwe met dit:
`currentState.outerHTML = newState.outerHTML;`
al genoeg

Maar wij willen een view transition die de search results naar boven brengt.
Het probleem is dat `preventDefault()` de view transition tegenhoudt.
Daarom moeten we in JavaScript de view transition zelf aanroepen
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L65-L68

Ik gebruik ook een breadcrumb menu bovenaan mijn pagina.
Dit moeten we ook zelf vervangen met de nieuwe versie.
https://github.com/vsheo/proof-of-concept/blob/5fec173ad0c3ddc4ec3cf2504448d0d17d7cfec5/public/main.js#L71-L73





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
Deze functie haalt alle Pokémon id’s op die zijn opgeslagen in de lijst `vsheoPKM`.
Alle opgeslagen Pokémon van deze lijst zijn te vinden via de volgende URL:
https://fdnd.directus.app/items/messages?filter={"for":"vsheoPKM"}

Deze data halen we op met een fetch.
https://github.com/vsheo/proof-of-concept/blob/602827d8a9dce6ec7b567c6e9287185e955aa7b0/server.js#L236-L238

Daarna slaan we alle id’s op in een array, die we doorsturen met een return
https://github.com/vsheo/proof-of-concept/blob/602827d8a9dce6ec7b567c6e9287185e955aa7b0/server.js#L241-L246





### Routes
site map foto

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
