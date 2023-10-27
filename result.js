const resContainer = document.getElementById("results");

chrome.storage.local.get(["shows"], (res) => {
    if (res.shows.length === 0) {
        let h3 = document.createElement("h3");
        h3.textContent = "No Results"
        resContainer.appendChild(h3)
    }
    else {
        res.shows.forEach((elem) => {
            renderShow(elem)
        })
    }

})

function renderShow(show) {
    const showDiv = document.createElement("div")

    const title = document.createElement("h2")
    title.textContent = show.show.name

    const image = document.createElement("img")
    image.src = show.show.image ? show.show.image.medium : null

    showDiv.appendChild(title)
    showDiv.appendChild(image)
    resContainer.appendChild(showDiv)
}