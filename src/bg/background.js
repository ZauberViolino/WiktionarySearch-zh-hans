// if you checked "fancy-settings" in extensionizr.com, uncomment this lines
// var settings = new Store("settings", {
//		 "sample_setting": "This is how you use Store.js to remember values"
// });
//example of using a message handler from the inject scripts
var lang = "zh";

var lang2 = "none";

chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.storage.sync.get("language", function(obj) {
        lang2 = obj.language;
    });
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
        sendResponse();
    });

chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("context"),
    "contexts": ["selection"],
    "onclick": function(e) {

        var bkg = chrome.extension.getBackgroundPage();

        var url = e.pageUrl;
        var wikURL = "https://zh.wiktionary.org/zh-hans/";

        if (e.selectionText) {
            wikURL += encodeURI(e.selectionText);
        }
        chrome.tabs.create({
            "url": wikURL
        });

    }
});

if (lang2 !== "none") {
    chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse) {
           chrome.pageAction.show(sender.tab.id);
           sendResponse();
       });

        chrome.contextMenus.create({
       "title": chrome.i18n.getMessage("context"),
       "contexts": ["selection"],
       "onclick": function(e) {

            var bkg = chrome.extension.getBackgroundPage();

            var url = e.pageUrl;
            var wikURL = "https://" + lang2 + ".wiktionary.org/wiki/";

            if (e.selectionText) {
                wikURL += encodeURI(e.selectionText);
            }
            chrome.tabs.create({
                "url": wikURL
            });

        }
        };
});

