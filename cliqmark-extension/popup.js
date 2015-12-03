document.addEventListener('DOMContentLoaded', function() {

  // Get the active tab
  var tab;
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      tab = tabs[0];
  });

  // Find the tab with our user's session/jwt (the window.localStorage.cliqmark_user prop)
  chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      console.log('tab', i, tabs[i]);
        if (tabs[i].title === 'Cliqmark') {
          theTab = tabs[i].windowId;
        }
    }
    // Trying to get access to the window object with the user session info we're looking for
    // so we can just access the localStorage property of the window
    // Doesn't work though (this isn't the right way to access the window object)
    chrome.windows.get(theTab, function(win){
       console.log('window', win);
    });
  });

  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    window.localStorage.userId = request.userId;
    sendResponse({}); // Is it necessary to call sendResponse?
  });

  // make a listener / action for Bookmark! button
  var addBookmarkButton = document.getElementById('addBookmark');
  addBookmarkButton.addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://0.0.0.0:3000/api/addBookmark', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    // todo: need real authentication mechanism, hard-coded user here
    xhr.send(JSON.stringify({ userId: 1, url: tab.url }));
    xhr.onloadend = function () {

    };

  }, false);

  // make a listener / action for MyBookmarks button
  var getBookmarksButton = document.getElementById('getBookmarks');
  getBookmarksButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'http://localhost:3000/#/bookmarks' });

  }, false);

}, false);
