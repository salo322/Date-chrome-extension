chrome.browserAction.onclicked.addListener(function(){
    chrome.tabs.create({'url':"main.html"})
})
