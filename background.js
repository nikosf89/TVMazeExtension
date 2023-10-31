chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.local.set({
        shows: [],
    })
    chrome.contextMenus.create({
        title: "Search TV Show",
        id: "contextMenu1",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        title: "Read This Text",
        id: "contextMenu2",
        contexts: ["selection"]
    })
    
})


chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "contextMenu1") {
        fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
            .then(res => res.json())
            .then(data => {
                chrome.storage.local.set({
                    shows: data
                }, () => {
                    chrome.tabs.create({
                        url: chrome.runtime.getURL("result.html")
                    });
                });
            });
    } else if (event.menuItemId === "contextMenu2") {
        chrome.tts.speak(event.selectionText, {
            lang: "zh-CN",
            rate: 1,
        });
    }
});

