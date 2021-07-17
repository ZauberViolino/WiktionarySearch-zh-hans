window.addEventListener('load', function(evt) {
    document.getElementById('search').addEventListener('submit', openURL);
    document.getElementById("word").placeholder = chrome.i18n.getMessage("popup");
    document.getElementById('word').focus();

});

function openURL() {
    event.preventDefault();
    var word = encodeURIComponent(document.getElementById('word').value);
    chrome.tabs.create({
        'url': "https://zh.wiktionary.org/zh-hans/" + word
    });
}
