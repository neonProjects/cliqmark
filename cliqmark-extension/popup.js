document.addEventListener('DOMContentLoaded', function() {

  var loginSignupButton = document.getElementById('login-signup');
  loginSignupButton.addEventListener('click', function() {
    //real action here
    console.log('login or signup');
  }, false);
  
  var addBookmarkButton = document.getElementById('addBookmark');
  addBookmarkButton.addEventListener('click', function() {
    //
    console.log('adding bookmark');
  }, false);

  var getBookmarksButton = document.getElementById('getBookmarks');
  getBookmarksButton.addEventListener('click', function() {
    //
    console.log('getting bookmarks');
  }, false);

}, false);