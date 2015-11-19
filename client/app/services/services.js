angular.module('cliqmark.services', [])

.factory('Bookmarks', function ($http, $window) {

  var getData = function(){
    var token = $window.localStorage.getItem('cliqmark_token');
    var userId = $window.localStorage.getItem('cliqmark_user');

    return $http({
      method: 'GET',
      url: '/api/getBookmarks?userId=' + userId, //todo: change this hard coded',
      data: token
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addBookmark = function(bookmark){
    $http({
      method: 'POST',
      url: '/api/addBookmark',
      data: bookmark
    });
  };

  return {
    getData: getData,
    addBookmark: addBookmark
  };
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
    .then(function (resp) {
      var storageItem = {
        token: resp.data.token,
        userId: resp.data.userId
      };
      return storageItem;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function (resp) {
      var storageItem = {
        token: resp.data.token,
        userId: resp.data.userId
      };
      return storageItem;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('cliqmark');
  };

  var signout = function () {
    $window.localStorage.removeItem('cliqmark');
    $location.path('/api/login');
  };


  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
