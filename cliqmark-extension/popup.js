document.addEventListener('DOMContentLoaded', function() {
  var tab;

  // Get the active tab
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      tab = tabs[0];
  });

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

    chrome.tabs.create({ url: 'http://localhost:3000/#/login' });
    //send GET request for cliqmark login / signup page
  }, false);

  var addBookmarkButton = document.getElementById('addBookmark');
  addBookmarkButton.addEventListener('click', function() {
    //this shows our button lister is working
    var token = window.localStorage.getItem('cliqmark_token');
    var userId = window.localStorage.getItem('cliqmark_user');


    chrome.storage.sync.get('sessionID', function(res) {
      var message2 = JSON.stringify(res);
      chrome.tabs.executeScript({
        code: 'console.log("hello")'
      })
    })


    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://0.0.0.0:3000/api/addBookmark', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify({ url: tab.url, userId: userId, token: token })); //userId hardcoded!!!!!
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ userId hardcoded!!!!!!

    xhr.onloadend = function () {
      // chrome.tabs.executeScript({
      //   code: 'console.log(xhr.responseText);'
      if (xhr.status === 200) alert(xhr.status);
    };
  }, false);

  var getBookmarksButton = document.getElementById('getBookmarks');
  getBookmarksButton.addEventListener('click', function() {

    // open angular app in new tab
    chrome.tabs.create({ url: 'http://localhost:3000/' });
  }, false);
}, false);
