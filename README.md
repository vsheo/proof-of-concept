# Poké-app
<!-- Geef je project een titel en schrijf in één zin wat het is -->
Een Pokédex website waarop je informatie, statistieken en evoluties van Pokémon kunt opzoeken en bekijken

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
    * [Code conventies](#Code-conventies)
      * [Code conventies - Naamgeving](#Code-conventies---Naamgeving)
      * [Code conventies - HTML](#Code-conventies---HTML)
      * [Code conventies - CSS](#Code-conventies---CSS)
      * [Code conventies - JavaScript](#Code-conventies---JavaScript)
    * [Responsive](#Responsive)
      * [Responsive - index](#Responsive---index)
      * [Responsive - detail](#Responsive---detail)
    * [HTML en Liquid](#HTML-en-Liquid)
      * [liquid assign](#liquid-assign)
      * [breadcrumbs nav](#breadcrumbs-nav)
      * [Dynamische background colors](#Dynamische-background-colors)
    * [CSS](#CSS)
      * [Styleguide](#Styleguide)
      * [View transition](#View-transition)
      * [Detail - tabs](#Detail---tabs)
        * [Tabs - meter element](#Tabs---meter-element)
      * [Detail - evolution hover animation](#Detail---evolution-hover-animation)
        * [Evolution hover - color](#Evolution-hover---color)
    * [JavaScript](#JavaScript)
      * [Client-side fetch - Caught](#Client-side-fetch---Caught)
      * [Client-side fetch - Search](#Client-side-fetch---Search)
      * [filter document click](#filter-document-click)
      * [filters focus out](#filters-focus-out)
    * [Server](#Server)
      * [Functies](#Functies)
        * [Functies - getIndexData](#Functies---getIndexData)
        * [Functies - structureJSON](#Functies---structureJSON)
        * [Functies - changeCaught](#Functies---changeCaught)
        * [Functies - getBookmarks](#Functies---getBookmarks)
      * [Routes](#Routes)
        * [Routes - Index GET](#Routes---Index-GET)
        * [Routes - Index POST](#Routes---Index-POST)
        * [Routes - generation](#Routes---generation)
        * [Routes - caught](#Routes---caught)
        * [Routes - search](#Routes---search)
        * [Detail - about data & stats](#Detail---about-data-and-stats)
          * [Detail - evolutions](#Detail---evolutions)
        * [Routes - error](#Routes---error)
          * [Error - generation route](#Error---generation-route)
          * [Error - details route](#Error---details-route)
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
### Code conventies - Naamgeving
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

 

### Code conventies - HTML
- In de HTML worden inline elementen op een regel geschreven, ook als het gaat om bijvoorbeeld een <h2> met een afbeelding en een tekst erin (de tekst wordt in een span geschreven)
https://github.com/vsheo/proof-of-concept/blob/0d7d10d53a93e092e325ab098389c94350fb1fd6/views/index.liquid#L16
- block elementen krijgen een lege regel erboven en eronder
voorbeeld van een block element:
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/index.liquid#L15-L31
- Liquid for loops en if/else statements worden een tab verder ingedent, en de HTML elementen binnen deze blokken worden nog een tab verder ingesprongen
voorbeeld:
https://github.com/vsheo/proof-of-concept/blob/d5dc532df03993b5b1dae9db611f52648191fec1/views/detail.liquid#L85-L93





### Code conventies - CSS
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





### Code conventies - JavaScript
- ik gebruik tabs, die ingesteld zijn op 4 spaties
- code zoveel als mogelijk op 1 regel doen
nadat de pokemon is gevonden haal ik alleen de id daarui(wat ik nodig heb)
https://github.com/vsheo/proof-of-concept/blob/5954516dbe2fbd706d3db72dce24aea68f726cb9/server.js#L125
hier zet ik variables gelijk in een link
https://github.com/vsheo/proof-of-concept/blob/5954516dbe2fbd706d3db72dce24aea68f726cb9/server.js#L231
- code in functies zijn altijd 1 tab verder ingedent
https://github.com/vsheo/proof-of-concept/blob/5954516dbe2fbd706d3db72dce24aea68f726cb9/server.js#L218-L224





## Responsive
### Responsive - index

https://github.com/user-attachments/assets/07d0bf8e-1154-4420-ba3a-19c386d9969e

De kolommen op de index pagina worden automatisch gemaakt met grid.
https://github.com/vsheo/proof-of-concept/blob/dad3bb20655942452122b7008b8dd77d6b93142b/public/styles/style.css#L169-L182
Bij `grid-template-columns` gebruik ik: `repeat(auto-fill, minmax(250px, 1fr));`

repeat herhaalt de kolommen.
`auto-fill` zorgt ervoor dat er alleen nieuwe kolommen worden gemaakt als er genoeg ruimte daarvoor is.
Met `minmax(250px, 1fr)` geef ik aan dat elke kolom minimaal 250px breed moet zijn, voordat er een nieuw kolom gemaakt mag worden
De `1fr` geeft aan dat de kolom alle beschikbare ruimte mag innemen.
Als er daarna weer genoeg plaats is voor een extra kolom(tenminste 250px width), dan wordt de bestaande kolom breedte vanzelf weer kleiner om ruimte te maken.

Dit kunnen we gebruiken op de Pokémon kaartjes in de kolom.
https://github.com/vsheo/proof-of-concept/blob/dad3bb20655942452122b7008b8dd77d6b93142b/public/styles/style.css#L184-L196
Door deze kaartjes `width: 100%` te geven, worden ze vanzelf breder.
Als er ruimte is voor een nieuwe kolom, dan worden de kaartjes vanzelf weer kleiner om plaats te maken voor de nieuwe kolom.
Dit zorgt ervoor dat de mobiele en tablet versie nooit te veel witruimte heeft, met de breedte van de kolom.
`max-width` zorgt ervoor dat de Pokémon kaartjes niet te ver stretchen.
Dit is vooral handig op mobiele en tablet versies, bij de overgang van een naar twee kolommen zou het Pokémon kaartje te breed worden, `max-width` houd dat tegen.





### Responsive - detail
https://github.com/user-attachments/assets/e2d1f661-624b-4865-857f-152e4657a6a4

Voor de detail pagina gebruik ik een grid om de pagina in twee sections te verdelen.
Met een mediaquery verander ik de layout zodat de sections naast elkaar staan in de desktop versie.
https://github.com/vsheo/proof-of-concept/blob/dad3bb20655942452122b7008b8dd77d6b93142b/public/styles/style.css#L252-L271

In de sections gebruik ik flex met width op 100% om de beschikbare ruimte in beslag te nemen, en met max-width om de width te stoppen waar dat nodig is.
https://github.com/vsheo/proof-of-concept/blob/dad3bb20655942452122b7008b8dd77d6b93142b/public/styles/style.css#L273-L287
https://github.com/vsheo/proof-of-concept/blob/dad3bb20655942452122b7008b8dd77d6b93142b/public/styles/style.css#L316-L332





## HTML en Liquid
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


View transitions zijn nog erg nieuw en worden nog niet door alle browsers ondersteund, zoals Firefox.
Daarom heb ik een fallback gemaakt: als view transitions worden ondersteund worden ze gebruikt, anders wordt de nieuwe data ingeladen zonder view transition.
https://github.com/vsheo/proof-of-concept/blob/5ca54ce7826235182fc3bddd1fa297752e271ed0/public/main.js#L65-L73





### Detail - tabs
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





#### Tabs - meter element
Het meter element wordt gestyled met ` ::-webkit` pseudo selector.
Deze werkt alleen in Chrome. Tijdens het testen zag ik dat de kleur in Safari en Firefox groen was, de default color.
In Safari is het niet gelukt om de kleur aan te passen, maar in Firefox wel.
In Firefox werkte het wel, maar daarvoor moest ik de `::-moz-meter-bar` pseudo selector gebruiken ipv `::-webkit`
`::-webkit` eerst voor chrome en daarna `::-moz-meter-bar` voor firefox:
https://github.com/vsheo/proof-of-concept/blob/c6da680fcc16cfd8e20de0c6c523320fb7d24caa/public/styles/style.css#L476-L484





### Detail - evolution hover animation
Op de detail pagina van Evolution is er een hover animatie:

https://github.com/user-attachments/assets/a4452ef6-6147-4145-b3e8-449d8e3b6d7e

Dit werkt doordat er een `::before` wordt toegevoegd aan de `pkm-evo` container.
De `::before` neemt de volledige ruimte van de `pkm-evo` container in beslag met `position: absolute` en `inset: 0`
https://github.com/vsheo/proof-of-concept/blob/ea41c5670df2aecf1831a15e4d48bb27926586e2/public/styles/style.css#L530-L540

Wanneer je over de `pkm-name` hover, wordt de width van de container volledig gevuld
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/styles/style.css#L542-L544

De hover moet op `pkm-name` staan omdat ik eerder ook een `::before` aan de link binnen `pkm-name` heb toegevoegd en dit over de hele `pkm-evo` container heb geplaatst.
Hierdoor kan de gebruiker overal binnen deze container klikken om naar de volgende detail pagina te gaan.
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/styles/style.css#L559-L571

Deze code bevat alles wat nodig is om de hover animatie te maken.
Maar, ik gebruik een custom property voor de background color die geanimeerd moet worden,
deze custom property bestaat nog niet.
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/styles/style.css#L536





#### Evolution hover - color
De background color wordt dynamisch via Liquid ingeladen met inline CSS. Hierdoor kan de kleur verschillen, afhankelijk van de Pokémon type
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/views/detail.liquid#L99

Om de juiste background color te gebruiken in CSS, schrijf ik alvast op het `::before` de custom property.
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/styles/style.css#L536

Daarna haal ik met JavaScript de kleur op.
We moeten eerst wachten totdat de DOM volledig is ingeladen.
Vervolgens selecteren we het `sprite` element, dit is het element waarop de background color inline staat.
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/main.js#L108-L110

Daarna controleren we of het `sprite` element op deze pagina aanwezig is.
Als we dit niet doen, stopt de JavaScript zodra we op een pagina komen waar dit element niet aanwezig is
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/main.js#L112

nu kunnen we de body selecteren, dit is waar we de nieuwe custom property aanmaken.
en we moeten ook de background color van het `sprite` element selecteren.
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/main.js#L114-L117

Nu hebben we alles om met `setProperty` de nieuwe custom property op de body aan te maken.
https://github.com/vsheo/proof-of-concept/blob/3c6db6ccb947139aee2eb3b87392822bd56c19c7/public/main.js#L120





## JavaScript
### Client-side fetch - Caught
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





### Client-side fetch - Search
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





### filter document click
Op de index pagina is er een filter list. Dit is een details element dat een summary en een ul heeft.
Normaal moet je weer op het details element klikken om het te sluiten.
Met JavaScript maak ik het ook mogelijk is om buiten het details element te klikken om het te sluiten

https://github.com/user-attachments/assets/8115f5c9-85da-4b21-9952-cc981bd904a3

in javascript selecteren we eerst het details element
https://github.com/vsheo/proof-of-concept/blob/c0fe0e3223b29ce9fe75971f4d1595db01035cdf/public/main.js#L79

Daarna moet de eventlistener niet op het details element geplaatst te worden, maar op de hele pagina(document)
Wanneer er een klik plaatsvindt op de pagina, kijk dan waar die klik was.
https://github.com/vsheo/proof-of-concept/blob/c0fe0e3223b29ce9fe75971f4d1595db01035cdf/public/main.js#L82-L85
Met `e.target` krijgen we het element waarop er geklikt was.
In de if statement controleren we of het geklikte element niet het details element was.
Als dat waar is, betekent het dat er buiten het details element geklikt werd.
Dus we kunnen het detailselement sluiten.
https://github.com/vsheo/proof-of-concept/blob/c0fe0e3223b29ce9fe75971f4d1595db01035cdf/public/main.js#L87





### filters focus out
Met de tab kun je over de filters (dit is een details summary element) navigeren zonder ze te openen.
Als je het filter menu wel opent en met tab door de filter links gaat, verlaat je na de laatste link het details element, maar het details element blijft open.

Met JavaScript selecteer ik het laatste element binnen het details element, dit is de laatste li
https://github.com/vsheo/proof-of-concept/blob/5ca54ce7826235182fc3bddd1fa297752e271ed0/public/main.js#L102

Daarop plaats ik een eventlistener op focusout.
Dit betekent dat er iets gebeurt zodra focus dit element verlaat.
In dit geval verwijder ik het open attribuut van het details element.
https://github.com/vsheo/proof-of-concept/blob/5ca54ce7826235182fc3bddd1fa297752e271ed0/public/main.js#L106-L108





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
Dit is de sitemap van de website. In server.js heb ik voor al deze pagina’s een route gemaakt
![site-map](https://github.com/user-attachments/assets/beb631e7-2290-4a90-9548-a0ba5e2b92fd)





#### Routes - Index GET
Dit is de hoofd pagina van de website. De data die ik hier nodig heb, bestaat uit:
- De Pokémon name: deze gebruik ik voor de link naar de detail pagina
- De Pokémon species name: dit is de correcte naam van de Pokémon. De Pokémon name bevat soms extra toevoegingen met een `-`
- De Pokémon id: deze gebruik ik om unieke ID’s te genereren, bijvoorbeeld voor data-enhanced en view-transition-name
- een lijst met alle Pokémon die in de caught list staan

De data voor de caught list haal ik op door de functie `getBookmarks()` aan te roepen.
Deze functie geeft een array terug met de id’s van de Pokémon die in de lijst staan.
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L49

De overige data krijg ik door de functie `getIndexData()` aan te roepen.
Deze functie maakt een JSON bestand met alle gegevens die nodig zijn om de Pokémon kaartjes op de index pagina te maken

De functie `getIndexData()` roep ik niet direct aan in de index route, omdat ik deze data ook gebruik in de routes voor generation filters, search en caught.
Daarom roep ik de functie een keer buiten de routes aan, en geef ik de data mee aan de routes waar het nodig is.

De functie `getIndexData()` haalt meer dan 1000 Pokémon op via fetches.
Om de performance te verbeteren, doet de server deze fetches maar een keer en slaat de data lokaal op, in de file [cache.json](https://github.com/vsheo/proof-of-concept/blob/main/cache.json)
de volgende keer dat de index pagina ingeladen wordt gebruikt de server deze opgeslagen data, zodat het laden sneller gaat.
cache.json:
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/cache.json#L1-L10

Om ervoor te zorgen dat de gebruiker altijd nieuwe informatie ziet, heb ik een controle gemaakt met een if en else statement.
met `fs.statSync` kijk ik als het cache.json bestand minder dan 12 uur geleden is bijgewerkt. als dat waar is gebeurt er niks en geef ik een console.log dat de cache new is
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L25-L29
Als het cache.json bestand langer dan 12 uur geleden is bijgewerkt, voer ik de functie `getIndexData()` opnieuw uit.
De oude cache wordt dan overschreven met nieuwe data
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L31-L35

Als de server voor het eerst opgestart wordt, is het bestand cache.json leeg.
Als je dan de volgende code uitvoert:
```JSON
const cacheData = fs.readFileSync("cache.json", "utf-8")
const cacheDataJSON = JSON.parse(cacheData)
```
zal de website crashen, omdat JSON.parse niets kan parsen uit een leeg bestand.
(voor nu heb ik cache.json bestand op github staan, omdat render de 1000+ fetches niet wilt uitvoeren)

Met een if statement heb ik een fallback gemaakt voor dit probleem.
Als er iets cache.json staat, is de lengte van de inhoud groter dan 0.
In dat geval kan de code verdergaan met het controleren van de laatste bewerking van de file.
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L22-L34

Als de cache leeg is, wordt de functie `getIndexData()` uitgevoerd om de data op te halen.
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L37-L40

Nu staat er zeker iets in cache.json geschreven, dus wanneer we de JSON gaan parsen, crasht de website niet.





#### Routes - Index POST
De POST op de index pagina voegt een Pokémon toe aan, of verwijdert deze uit, je caught Pokémon lijst.
Op de pagina heeft elk Pokémon kaartje een unieke `action`, die wordt gemaakt met de Pokémon id.
https://github.com/vsheo/proof-of-concept/blob/4a838bf90bf682e6b612788bb290ead482ad757d/views/index.liquid#L44

deze id vraag ik in de server op met `request.params`
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L56-L57

Het toevoegen of verwijderen van een Pokémon uit de lijst gebeurt via de `changeCaught()` functie.
Deze functie neemt de naam van de eigenaar van de lijst en de Pokémon id mee via de `request.params`.
de rest van deze POST wordt door de functie verwerkt
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L59

Nadat de post klaar is wordt de pagina redirect naar de hoofd pagina
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L62

Eerst gebruikte ik `/:pkmId` voor de POST, en in een ander route `/gen`.
Daardoor ontstond een probleem: de server ging de de generation nummer posten in de database.
Nu heb ik de URL: URL: `/toggle-caught/:pkmId` voor de post
en `/pokemon/generation-:number` voor de generation filters





#### Routes - generation
Deze route geeft alle Pokémon van een Pokémon generatie terug.

Eerst had ik alle Pokémon op de hoofd pagina staan. Ik was van plan om alleen de optie te geven om per Pokémon generatie de Pokémon te tonen, om de website sneller te maken.
Uiteindelijk merkte ik dat de website alleen traag was bij de eerste search, ook wanneer hij op Render werd gehost. Dit komt doordat ik alle data voor de hoofd pagina maar een keer ophaal en opsla in een lokaal JSON bestand

Op mijn telefoon was het ook alleen bij de eerste zoekopdracht langzaam, verder viel het wel mee, vooral gezien dat er 1025 Pokémon op de hoofd pagina worden ingeladen.
Daarom heb ik besloten om toch alle 1025 Pokémon in te laden.

Maar omdat ik de filters al had, heb ik ze op de website gelaten.<br><br>


Op de index pagina heb ik een ul met linkjes naar deze route. Het enige dat verschilt per link is het cijfer aan het eind van de URL, dat de generatie aangeeft.
https://github.com/vsheo/proof-of-concept/blob/4a838bf90bf682e6b612788bb290ead482ad757d/views/index.liquid#L18-L29

In de route haal ik het generation cijfer op met `request.params`
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L66-L67

Deze array bevat 10 items. Het item op de eerste index is een placeholder, zodat het generatie getal(die met request.params opgehaald wordt) overeenkomt met de index in de array (pkmGeneration[1] = [0,151]).
Elke geneste array bevat het id van de eerste en laatste Pokémon die bij die generatie behoord (bijvoorbeeld generatie 1 = ID 1 t/m 151).
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L70

met filter ga ik door mn data uit cache.json, en maak ik een nieuwe array `genData`.
Deze heeft de velden: id, spName, types en name. Met `genData` kunnen de pokemon kaartjes gemaakt worden voor alle pokemnon die tot een generation behoren
https://github.com/vsheo/proof-of-concept/blob/4ba1f40116c3874a89b13618ff4ed6281bbac863/server.js#L73

Voor elk item in de data controleert de filter of de Pokémon id groter is dan het eerste getal in de geneste array en kleiner dan het tweede getal.
alles dat daarbuiten is wordt weg gelaten
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L74

De data wordt meegegeven aan de pagina in de variable `pkmData`.
In Liquid gebruik ik deze variabele om alle Pokémon kaartjes op de hoofd pagina in te laden.
Voor de generation filter gebruik ik dezelfde variabele, maar dan met gefilterde data.
Daardoor hoef ik in index.liquid verder niets aan te passen, de kaartjes worden automatisch goed in geladen.
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L80

Daarna roep ik de `getBookmarks()` functie aan om de lijst met caught Pokémon op te halen.
Deze functie moet ik in elke route aanroepen, omdat de lijst kan veranderen na een POST.

Als ik de functie buiten de routes zou plaatsen, wordt een Pokémon wel opgeslagen tijdens een POST,
maar de succes state zal niet op beeld komen, omdat de caught Pokémon lijst dan niet opnieuw opgehaald wordt.
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L78

De variabeles: `gen` en `pageTitle` heb ik nodig om het breadcrumb menu op te maken





#### Routes - caught
dit is een simple route die alleen de id uit de caught pokemon lijst neemt
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L84-L86

Daarna filter ik op deze id’s in cache.json. De id’s uit de caught lijst zijn strings, omdat ze als string in Directus zijn opgeslagen.
Ik zet de id’s uit cache.json eerst om naar een string met `toString()`, zodat ik ze kan vergelijken met de id’s uit de caughtList
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L92-L94

Daarna stuur ik de array met alle Caught Pokémon data(`caughtData`) mee naar de pagina in de variabele `pkmData`, zodat Liquid de kaartjes op de juiste manier kan inladen.
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L96

De variabele `pkmCaught: caughtList` gebruik ik om de ingekleurde Pokéball te tonen in plaats van de grijze, wanneer een Pokémon in jouw lijst staat.
De variabele `pageTitle` wordt gebruikt voor het breadcrumb menu.





#### Routes - search
Op de index pagina is er een form met een input type search waarmee je kunt zoeken naar een Pokémon.
https://github.com/vsheo/proof-of-concept/blob/7889b7d3feae83cd478e449bddb05ec45889131f/views/index.liquid#L10-L13

Dit keer werken we met `request.query`.
De form maakt zelf een URL aan met de tekst uit input: `/search?query=blastoise`
Met `request.query` halen we de tekst van de gebruiker op uit de URL.
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L100-L101

We gebruiken de tekst als filter en zoeken naar Pokémon namen die deze letters hebben, in precies dezelfde volgorde.
Dat kunnen we doen met de `includes()`.

`includes()` geeft true of false terug als de tekst voorkomt in een Pokémon name.
Zo kun je bijvoorbeeld zoeken op 'saur' en krijg je Pokémon als 'Bulbasaur' te zien, omdat die naam daarop eindigt.

`includes()` is case sensitive. Omdat alle namen in de database kleine letters zijn, gebruiken we `toLowerCase()` om de search tekst naar kleine letters om te zetten.

De `filter()` zorgt ervoor dat alle Pokémon names die true teruggeven in een nieuwe array worden geplaatst.
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L106-L108

Deze data geven we door aan de pagina in de variabele `pkmData`, zodat Liquid alles op de juiste plek kan laten inladen.
https://github.com/vsheo/proof-of-concept/blob/72b14e0de4c0e537209cf03f997c19595bdbabb3/server.js#L110





#### Routes - detail
Op de detail route hebben we 3 soorten data nodig: de about data, de stats data en de evolutions data

##### Detail - about data and stats
we beginnen  met deze fetch URL: https://pokeapi.co/api/v2/pokemon/(+ de naam of id van de pokemon)

Op deze URL kun je zowel het id als de naam van de Pokémon gebruiken om de data op te halen.
Ik gebruik de naam, zodat de gebruiker in de URL kan zien op welke detail pagina van welke Pokémon hij zit.


Op deze URL kun je de volgende data van een Pokémon vinden:
- id
- name
- base_experience
- weight
- height
- types
- abilities
- alle stats

Deze data stuur ik door naar Liquid als pkmInfo. In Liquid geef ik aan welke data ingeladen en getoond moet worden.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L58
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L61
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L64

De Pokémon name wordt van de index pagina doorgestuurd.
We gebruiken species name alleen om de naam op pagina te tonen, niet in de href, omdat die niet gebruikt kan worden om data op te halen van de API.
https://github.com/vsheo/proof-of-concept/blob/90c4644dcd4ab47e2ea19a0ed86ea6852a40f1f4/views/index.liquid#L42

https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L67

types zit in een array, daarom gebruiken we een for loop om ze eruit te halen.
Met forloop.index0 telt de iteraties van de loop, vanaf 0 in plaats van 1.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L70-L74

abilities zit ook in een array, dus die halen we ook met een for loop eruit.
Deze keer gebruiken we een if statement om na de eerste iteratie een komma toe te voegen.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L77-L81

De stats kunnen we makkelijk ophalen omdat ze in een array staan, waardoor we kunnen loopen.
De JSON structuur is voor elke stat hetzelfde, het enige verschil is de opgeslagen data.
JSON structuur
```JSON
"stats": [
    {
        "base_stat": 45,
        "effort": 0,
        "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
        }
    },
    {
        "base_stat": 49,
        "effort": 0,
        "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
        }
    },
```
We gebruiken een for loop om alle li in te vullen met de `stat.name` en de waarde `stat.base_stat`
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/views/detail.liquid#L85-L93




##### Detail - evolutions
Deze data is wat lastiger te vinden, omdat je eerst een URL moet volgen naar een andere URL om deze data te vinden.

als we beginnen op de standaard url:
https://pokeapi.co/api/v2/pokemon/squirtle

hierin is er een link naar pokemon-species: https://pokeapi.co/api/v2/pokemon-species/7/
```JSON
"species": {
    "name": "squirtle",
    "url": "https://pokeapi.co/api/v2/pokemon-species/7/"
},
```
Deze URL werkt alleen met het id van de Pokémon.
Op deze pagina is een link naar een andere URL waar alle evolutions van die Pokémon staan: https://pokeapi.co/api/v2/evolution-chain/3/
```JSON
"evolution_chain": {
    "url": "https://pokeapi.co/api/v2/evolution-chain/3/"
},
```

Het probleem is dat het id in de evolution-chain link niet hetzelfde is als de Pokémon id.
Het evolution-chain id geldt voor alle Pokémon binnen die chain.
Dus bijvoorbeeld:
- evolution-chain 1 heeft Bulbasaur, Ivysaur en Venusaur
- evolution-chain 2 heeft Charmander, Charmeleon en Charizard
- evolution-chain 3 heeft Squirtle, Wartortle en Blastoise

Om de juiste evolution chain te vinden, moeten we eerst via de Pokémon species URL:
https://pokeapi.co/api/v2/pokemon-species/7/

Naar de evolution-chain link gaan:
https://pokeapi.co/api/v2/evolution-chain/3/

Dus we moeten een fetch in een fetch doen.<br><br>


Als eerste moeten we de id van de Pokémon opzoeken.
We hebben de naam van de Pokémon, dus gebruiken we `find()` op `cache.json` om de id te vinden.

`find()` zoekt naar het eerste item dat aan de voorwaarde voldoet en stopt daarna met zoeken.
In dit geval zoeken we op de naam van de Pokémon en krijgen we het volgende terug:
```JSON
  {
    "id": 7,
    "spName": "squirtle",
    "types": [
      "water"
    ],
    "name": "squirtle"
  }
```
We hebben hier alleen de id nodig, dus die kunnen we direct ophalen met:
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L122


Met die id kunnen we onze eerste fetch doen op deze URL: https://pokeapi.co/api/v2/pokemon-species/ `+ id`
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L127-L128

Daarna kunnen we een tweede fetch uitvoeren naar de evolution-chain URL, die in de Pokémon-species data staat
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L131-L132

Voor het evolutions tab moeten we opnieuw de id’s van alle Pokémon in de evolution chain ophalen.
De id die we nu hebben kunnen we hiervoor niet gebruiken, omdat we een evolution chain voor meerdere Pokémon hetzelfde is.
We weten dus niet zeker op welke Pokémon de gebruiker zich bevindt.
Daarom zoeken we van alle drie de Pokémon in de chain opnieuw hun id op.

De id staat niet in de data van deze fetch, maar is het staat wel in een URL.
Als we de URL splitsen met `split('/')`, dan staat de id altijd op de 6de positie van de array die we eruit krijgen.
```JSON
"url": "https://pokeapi.co/api/v2/pokemon-species/9/"
```
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L139

De data van deze fetch ziet er zo uit (velden die niet belangrijk zijn, heb ik weggelaten):
```JSON
{
    "chain": {
        "evolves_to": [
            {
                "evolves_to": [
                    {
                        "evolution_details": [
                            {}
                        ],
                        "evolves_to": [],
                        "species": {
                            "name": "blastoise",
                            "url": "https://pokeapi.co/api/v2/pokemon-species/9/"
                        }
                    }
                ],
                "species": {
                    "name": "wartortle",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/8/"
                }
            }
        ],
        "species": {
            "name": "squirtle",
            "url": "https://pokeapi.co/api/v2/pokemon-species/7/"
        }
    }
}
```

Wat we uit deze data nodig hebben, zijn de id’s van de pokemon, die staan in:
- `chain.evolves_to`: hier staat de tweede vorm van de Pokémon( stage 2)
- `chain.evolves_to[0].evolves_to`: dit bevat de derde evolution vormen, als die er zijn.


De id van de eerste vorm (basic stage id) hebben we al eerder opgehaald, deze staat opgeslagen in `basicId`.

Als een Pokémon niet evolved, bestaat `chain.evolves_to[0].evolves_to` niet.
Als de Pokémon wel evolved, dan gebruiken we een if statement om eerst te controleren of deze velden bestaan. Zo voorkomen we dat de server crasht wanneer de velden er niet zijn.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L147

Om de id’s van alle stage 3 evolutions (alles na stage 2) op te halen, gebruiken we `map()`
Deze loopt door de `evolves_to` array, pakt van elke item `species.url`

Daarna splitsen we de URL op `/` en halen we de id op, die altijd op index 6 staat.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L149

Hetzelfde doen we voor alle stage 2 evolutions.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L153-L155

Als laatste dat we doen in deze route is de caught list opnieuw op halen, zodat de Pokémon een ingekleurde Pokéball kan krijgen.
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L159-L161

Al deze data stuur ik mee naar de pagina via `response.render`
https://github.com/vsheo/proof-of-concept/blob/aa79fb9d0185b05bea7877485207ebd7568725c3/server.js#L163





#### Routes - error
Voor de error route heb ik een algemene `app.use` gemaakt die alle niet-bestaande pagina’s opvangt.
Dit vangt URL's op die niet compleet zijn of waar iets teveel aan is toegevoegd, bijvoorbeeld:
`/fghgds`
`/pokemon/genrrr`
`/pokemon/caughttt`

`app.use` is een functie van express.js die alle routes opvangt die niet bestaan.
Wanneer zo’n route wordt gevraagd, renderen we de error pagina `error.liquid`
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L316-L319

Deze `app.use` vangt geen verzoeken op waarbij data van de website naar de server wordt gestuurd, zoals:
`/pokemon/generation-:number`
`/details/:pkmName`

Voor `:number` en `:pkmName` accepteert de server alle mogelijke waarden.
In deze routes kunnen we daarom try catch gebruiken om fouten op te vangen.





##### Error - generation route
In de try komt de code die we eerder hadden, maar we voegen nu een if statement toe:
als het getal kleiner is dan 1 of groter dan 10, dan stoppen we de uitvoering van de code.
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L76-L80

In de if statement maken we een error message en voegen er zelf een status toe aan deze error.
Vervolgens geven we deze error door aan de error handler van express met `next(error)`
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L81-L83

Om dit te kunnen gebruiken, moeten we in onze route ook aangeven dat we `next` mogen gebruiken.
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L76

We hebben nu een nieuwe `app.use` nodig die deze errors opvangt die we met `next()` naar de error handler hebben doorgestuurd.
Deze `app.use` rendert de error pagina.
Daarnaast wordt de error message in de console van vscode weergegeven, zodat je kunt nagaan van waar de error kwam.
https://github.com/vsheo/proof-of-concept/blob/a37bf86697c5d08f0e870e3af8d1bf7950a579b4/server.js#L308-L311

als we nu dit proberen:
`/pokemon/generation-10`
dan krijgen we de error pagina

In de catch vangen we alle fouten op die in de `try` kunnen ontstaan. Dit zijn, in dit geval, internal server errors, bijvoorbeeld als er iets misgaat bij een fetch.
De `errorMessage` loggen we in de console(console.log) binnen de `app.use` zodat we de fout kunnen zien van welke route de fout kwam.
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L100-L105
Express weet vanzelf dat het om een error gaat wanneer we een variabele(`errorMessage`) via `next()` doorsturen.





##### Error - details route
Ook in deze route heb ik een try catch toegevoegd.
Alle code die ik eerder had, staat nu binnen de try block.
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L139-L141

Ik heb bij deze niets extra’s toegevoegd in de try, omdat het niet nodig was.
De `pkmName` wordt hier direct in de fetch URL gebruikt.
Als er iets misgaat, vangt de catch dat direct op.
https://github.com/vsheo/proof-of-concept/blob/128a8ded412864427c228f0c944071801798e605/server.js#L144-L145

Deze error sturen we door naar de error handler, met statuscode 500. Dit betekent dat dit een internal server error was.
https://github.com/vsheo/proof-of-concept/blob/a37bf86697c5d08f0e870e3af8d1bf7950a579b4/server.js#L190-L194

Dezelfde `app.use` vangt ook deze error op.
https://github.com/vsheo/proof-of-concept/blob/a37bf86697c5d08f0e870e3af8d1bf7950a579b4/server.js#L308-L311





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
