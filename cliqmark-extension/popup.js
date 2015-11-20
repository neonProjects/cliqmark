document.addEventListener('DOMContentLoaded', function() {
  
  // Get the active tab
  var tab;
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      tab = tabs[0];
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




