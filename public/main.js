// workshop
// https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/client-side-fetch.md

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

            const responseText = await response.text();

            const parser = new DOMParser();
            const responseDOM = parser.parseFromString(responseText, "text/html")

            const newState = responseDOM.querySelector(
                '[data-enhanced="' + form.getAttribute("data-enhanced") + '"]'
            );

            form.classList.remove('loading-state')

            form.outerHTML = newState.outerHTML;
        }
    });
}


if ("onsubmit" in window && "DOMParser" in window) {
    document.addEventListener("submit", async function (event) {
        const form = event.target;
        
        if (form.classList.contains("search-bar")) {
            event.preventDefault();

            // maak de URL met de query voor de GET request
            const url = form.action + '?' + new URLSearchParams(new FormData(form));

            const response = await fetch(url, {
                method: "GET"
            });

            const responseText = await response.text();

            const parser = new DOMParser();
            const responseDOM = parser.parseFromString(responseText, "text/html")

            // select de oude pkm-container
            const currentState = document.querySelector(".pkm-container")
            // select de pkm-container die gefetched is
            const newState = responseDOM.querySelector(".pkm-container")
            // update de oude pkm-container en laat de resultaten met view transition naar boven komen
            document.startViewTransition(() => {
                currentState.outerHTML = newState.outerHTML;
            });

            // update de breadcrumb nav
            const currentNav = document.querySelector(".breadcrumbs")
            const newNAv = responseDOM.querySelector(".breadcrumbs")
            currentNav.outerHTML = newNAv.outerHTML;
        }
    })
}

// auto submit
// https://stackoverflow.com/questions/58629007/how-to-get-search-result-when-typing-without-hiting-enter-button-or-submit-butto
// https://www.syncfusion.com/forums/161259/auto-search-when-typing
const input = document.querySelector('input')
input.addEventListener('keyup',)


// const form = document.querySelector('.search-bar');

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const url = form.action + '?' + new URLSearchParams(new FormData(form));

//   if (document.startViewTransition) {
//     document.startViewTransition(async () => {
//       const response = await fetch(url);
//       const html = await response.text();

//       // Replace content in .pkm-container
//       const temp = document.createElement('div');
//       temp.innerHTML = html;
//       const newContainer = temp.querySelector('.pkm-container');

//       document.querySelector('.pkm-container').replaceWith(newContainer);
//     });
//   } else {
//     window.location.href = url;
//   }
// });



// // meest dichtstbijzijnde article (parrent element waar de event plaats heeft gevonden)
// // get id uit form action
// const imgId = form.action.split('/')[4]
// console.log(imgId)
// const article = form.closest("article");
// const img = article.querySelector("#add-loading-img");
// img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${imgId}.gif`;
// img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imgId}.png`;
