document.addEventListener('DOMContentLoaded', function() {

  var loginSignupButton = document.getElementById('login-signup');
  loginSignupButton.addEventListener('click', function() {
    //this shows our button lister is working
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });

    // var message = '"set some storage"'
    // chrome.storage.sync.set({'sessionID': 8675309}, function() {
    //   chrome.tabs.executeScript({
    //     code: 'console.log(' + message + ')'
    //   });
    // });

    // chrome.storage.sync.get('sessionID', function(res) {
    //   var message2 = JSON.stringify(res);
    //   chrome.tabs.executeScript({
    //     code: 'console.log("hello")'
    //   })
    // })

    var message3 = '"login clicked"'
    chrome.tabs.executeScript({
      code: 'console.log('+ message3 + ')'
    });
    //send GET request for cliqmark login / signup page
  }, false);
  
  var addBookmarkButton = document.getElementById('addBookmark');
  addBookmarkButton.addEventListener('click', function() {
    //this shows our button lister is working
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="blue"'
    });
    //send POST reqest with info from current page
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://0.0.0.0:3000/bookmark', true);
    // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // // send the collected data as JSON
    // xhr.send(JSON.stringify({ url: tab.url }));

  }, false);

  var getBookmarksButton = document.getElementById('getBookmarks');
  getBookmarksButton.addEventListener('click', function() {
    //this shows our button lister is working
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="green"'
    });
    //send GET request for cliqmark "bookmarks" page
  }, false);

}, false);