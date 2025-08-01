// workshop
// https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/client-side-fetch.md

// add to caught
if ("fetch" in window && "DOMParser" in window) {
    document.addEventListener("submit", async function (event) {
        const form = event.target;
        // console.log(form);

        if (!form.hasAttribute("data-enhanced")) {
            return;
        }

        if (form.classList.contains("pkm-pokeball")) {
            event.preventDefault();

            const imgRotate = form.querySelector("img")
            imgRotate.classList.add('loading-state')

            const response = await fetch(form.action, {
                method: form.method,
                body: new URLSearchParams(new FormData(form)),
            });

            const responseText = await response.text()

            const parser = new DOMParser();
            const responseDOM = parser.parseFromString(responseText, "text/html")

            const newState = responseDOM.querySelector(
                '[data-enhanced="' + form.getAttribute("data-enhanced") + '"]'
            );

            form.classList.remove('loading-state')

            form.outerHTML = newState.outerHTML
        }
    });
}

// search
if ("onsubmit" in window && "DOMParser" in window) {
    document.addEventListener("submit", async function (event) {
        const form = event.target
        
        if (form.classList.contains("search-bar")) {
            event.preventDefault()

            // maak de URL met de query voor de GET request
            const url = form.action + '?' + new URLSearchParams(new FormData(form));

            const response = await fetch(url, {
                method: "GET"
            });

            const responseText = await response.text()

            const parser = new DOMParser()
            const responseDOM = parser.parseFromString(responseText, "text/html")

            // select de oude pkm-container
            const currentState = document.querySelector(".pkm-container")
            // select de pkm-container die gefetched is
            const newState = responseDOM.querySelector(".pkm-container")

            if (document.startViewTransition) {
                // update de oude pkm-container en laat de resultaten met view transition naar boven komen
                document.startViewTransition(() => {
                    currentState.outerHTML = newState.outerHTML
                });
            }
            else {
                currentState.outerHTML = newState.outerHTML;
            }

            // update de breadcrumb nav
            const currentNav = document.querySelector(".breadcrumbs")
            const newNAv = responseDOM.querySelector(".breadcrumbs")
            currentNav.outerHTML = newNAv.outerHTML
        }
    })
}

// load more
if ("fetch" in window && "DOMParser" in window) {
    document.addEventListener("submit", async function (event) {
        const form = event.target;
        // console.log(form);

        if (form.classList.contains("btn-load-more")) {
            event.preventDefault();

            const response = await fetch(form.action, {
                method: form.method,
            });

            const responseText = await response.text()

            const parser = new DOMParser()
            const responseDOM = parser.parseFromString(responseText, "text/html")

            // select de oude pkm-container
            const currentState = document.querySelector(".pkm-container")
            // select de pkm-container die gefetched is
            const newState = responseDOM.querySelector(".pkm-container")

            if (document.startViewTransition) {
                // update de oude pkm-container en laat de resultaten met view transition naar boven komen
                document.startViewTransition(() => {
                    currentState.outerHTML = newState.outerHTML
                });
            }
            else {
                currentState.outerHTML = newState.outerHTML
            }

            // selecteer en update de load more button
            const loadMore = document.querySelector(".btn-load-more")
            const newloadMore = responseDOM.querySelector(".btn-load-more")
            loadMore.outerHTML = newloadMore.outerHTML

            // update de breadcrumb nav
            const currentNav = document.querySelector(".breadcrumbs")
            const newNAv = responseDOM.querySelector(".breadcrumbs")
            currentNav.outerHTML = newNAv.outerHTML

            // roep de functie aan zodat de button weer op display block komt
            // in de nieuwe dom heeft het weer de hidden class
            loadBtnVisible()
        }
    });
}

// load more button alleen als de gebruiker op de "all pokemon" pagina is
function loadBtnVisible() {
  const loadMoreBtn = document.querySelector('.btn-load-more');
  const breadcrumbs = document.querySelector('.breadcrumbs');

  if (loadMoreBtn && breadcrumbs) {
    const links = breadcrumbs.querySelectorAll('a');

    // als de breadcrumb met home begint dan is er een load more button
    if (links.length && links[0].textContent.trim().startsWith('Home: ')) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  }
}
// roep de functie aan
loadBtnVisible()


// https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element#:~:text=Here%20is%20the%20vanilla%20JavaScript%20solution%20for%20future%20viewers.
const filters = document.querySelector('.pkm-filters')

if (filters) {
    // luister dan naar een klik event op de web pagina
    document.addEventListener('click', (e) => {
        // als er een klik plaats vindt dat niet op/in het details element is
        // of als er een klik plaatst vindt op het summary element
        if (!filters.contains(e.target)) {
            // dan sluit het details element
            filters.removeAttribute('open')
        }
    });
}


// sluit details als tab index het menu verlaat
// selecteer het laatste element van het menu
const lastTab = document.querySelector('.pkm-filters li:last-child')

// https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
if (lastTab) {
    // Wanneer het laatste element in het detail element focus verliest, dan sluit het detail element
    lastTab.addEventListener('focusout', (e) => {
        filters.removeAttribute('open')
    })
}


// van error pagina 1 pagina terug gaan
const btnBack = document.querySelector('.back-button')

if (btnBack) {
    btnBack.addEventListener('click', () => {
        window.history.back()
    })
    
    btnBack.hidden = false
}


// haal dynamische background color op en plaats het in een custom property
// wacht totdat de dom ingeladen is
document.addEventListener('DOMContentLoaded', () => {
    // selecteer het element waar de background color staat
    const sprites = document.querySelector('.sprite')

    if (sprites) {
        // selecteer de body
        const body = document.querySelector('body')

        // haal de background color op
        const bgColor = sprites.style.backgroundColor

        // bewaar de kleur in een nieuw custom property die op de body staat
        body.style.setProperty('--current-bg-color', bgColor)
    }
});










// auto submit
// https://stackoverflow.com/questions/58629007/how-to-get-search-result-when-typing-without-hiting-enter-button-or-submit-butto
// https://www.syncfusion.com/forums/161259/auto-search-when-typing




// // meest dichtstbijzijnde article (parrent element waar de event plaats heeft gevonden)
// // get id uit form action
// const imgId = form.action.split('/')[4]
// console.log(imgId)
// const article = form.closest("article");
// const img = article.querySelector("#add-loading-img");
// img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${imgId}.gif`;
// img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imgId}.png`;
