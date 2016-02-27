// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    var selectedText = info.selectionText;

     chrome.storage.sync.get({
         selectedEngine: 'Google',
         appendText: '',
         prependText:''
    }, function(items) {
         var selectedSearchEngine = items.selectedEngine;
         var prepend = items.prependText;
         var append = items.appendText;
         if (info.menuItemId == "contextselection"){
             chrome.tabs.create(
                 {
                     "url":getSEURL(selectedSearchEngine)+prepend+' '+selectedText+' '+append
                 });
         }
         else if (info.menuItemId == "optionspage"){
             chrome.runtime.openOptionsPage();
         }
         else {
             console.log("item " + info.menuItemId + " was clicked");
             console.log("info: " + JSON.stringify(info));
             console.log("tab: " + JSON.stringify(tab));
         }
    });

};

chrome.contextMenus.onClicked.addListener(onClickHandler);
function getSEURL(searchengine){
    var SEurl;
    switch(searchengine){
        case 'Yahoo':
            SEurl = "http://search.yahoo.com/search?q=";
            break;
        case 'Bing':
            SEurl = "http://www.bing.com/search?q=";
            break;
        case 'Google':
            SEurl = "http://www.google.com/search?q=";
            break;
        case 'Wikipedia':
            SEurl = "http://en.wikipedia.org/wiki/";
            break;
        case 'Tumblr':
            SEurl = "http://www.tumblr.com/search/";
            break;
        case 'AmazonUK':
            SEurl ="http://www.amazon.co.uk/s/field-keywords=";
        case "Youtube":
            SEurl ="http://www.youtube.com/results?search_query=";
    }
return SEurl;
}
chrome.storage.onChanged.addListener(function(changes,ns){
    console.log(changes);
    chrome.storage.sync.get({
        selectedEngine: 'Google',
        appendText: '',
        prependText:''
    },function(items){
        var selectedSearchEngine = items.selectedEngine;
        if(items.appendText !== "" || items.prependText !== ""){
            var title = "Search for '"+items.prependText+" %s "+items.appendText+"' on "+selectedSearchEngine;
        }
        else{
            var title = "Search for '%s' on "+selectedSearchEngine;
        }
         chrome.contextMenus.update("contextselection",{"title": title});
    });
});
// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.


    chrome.storage.sync.get({
        selectedEngine: 'Google',
        appendText: '',
        prependText:''
    },function(items){

        var selectedSearchEngine = items.selectedEngine;
        if(items.appendText !== "" || items.prependText !== ""){
            var title = "Search for '"+items.prependText+" %s "+items.appendText+"' on "+selectedSearchEngine;
        }
        else{
            var title = "Search for '%s' on "+selectedSearchEngine;
        }

        var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
            "id": "context" + "selection"},function(){});
    });


});
