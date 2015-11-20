document.addEventListener('DOMContentLoaded', function() {
  var tab;

  // Get the active tab
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      tab = tabs[0];
  });



  
  var addBookmarkButton = document.getElementById('addBookmark');
  addBookmarkButton.addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://0.0.0.0:3000/api/addBookmark', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');


    // send the collected data as JSON
    xhr.send(JSON.stringify({ userId: 1, url: tab.url }));

    xhr.onloadend = function () {

    };
    

  }, false);





  var getBookmarksButton = document.getElementById('getBookmarks');
  getBookmarksButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'http://localhost:3000/#/bookmarks' });

  }, false);

}, false);




