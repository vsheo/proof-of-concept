// workshop
// https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/client-side-fetch.md

if ("fetch" in window && "DOMParser" in window) {
    document.addEventListener("submit", async function (event) {
        const form = event.target;
        console.log(form);

        if (!form.hasAttribute("data-enhanced")) {
            return;
        }

        event.preventDefault();
        form.classList.add('loading-state')


        const response = await fetch(form.action, {
            method: form.method,
            body: new URLSearchParams(new FormData(form)),
        });

        const responseText = await response.text();

        const parser = new DOMParser();
        const responseDOM = parser.parseFromString(responseText, "text/html");

        const newState = responseDOM.querySelector(
            '[data-enhanced="' + form.getAttribute("data-enhanced") + '"]'
        );

        form.classList.remove('loading-state')

        form.outerHTML = newState.outerHTML;
    });
}



// // meest dichtstbijzijnde article (parrent element waar de event plaats heeft gevonden)
// // get id uit form action
// const imgId = form.action.split('/')[4]
// console.log(imgId)
// const article = form.closest("article");
// const img = article.querySelector("#add-loading-img");
// img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${imgId}.gif`;
// img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imgId}.png`;
