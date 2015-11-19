var app = angular.module('cliqmark', [
    'cliqmark.bookmarks',
    'cliqmark.auth',
    'cliqmark.services',
    'ngRoute'
  ]);

app.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/bookmarks', {
      templateUrl: 'app/bookmarks/bookmarks.html',
      controller: 'BookmarksController'
    })
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/bookmarks'
    });
});

//todo: put this in another file
// app.factory('Bookmarks', function($http) {
//   var getData = function() {
//     //todo: call DB, get bookmarks
//     // return [
//     //   {id: 1, url: 'http://www.google.com', title: 'google'},
//     //   {id: 2, url: 'http://www.cnn.com', title: 'cnn'}, 
//     //   {id: 3, url: 'http://www.yahoo.com', title: 'yahoo'},
//     //   {id: 4, url: 'http://www.nytimes.com', title: 'nytimes'},
//     //   {id: 5, url: 'http://www.hackreactor.com', title: 'hackreactor'},
//     //   {id: 6, url: 'http://www.wm.edu', title: 'w&m'}
//     // ];
//     //todo: make real call to DB, something like this
//     return $http({
//       method:'GET',
//       url: '/getBookmarks?userId=1' //todo: change this hard coded
//     })
//     .then(function(resp) {
//       return resp.data;
//     });
//   }
//   return {
//     getData: getData
//   };
// });

//todo: put this in another file
// app.controller('BookmarksController', function($scope, Bookmarks) {
//   $scope.data = {};
//   $scope.getBookmarks = function() {
//     //todo: replace this fake data with real call to DB
//     // var data = Bookmarks.getData();
//     // $scope.data.bookmarks = data;
//     Bookmarks.getData()
//       .then(function(data) {
//         $scope.data.bookmarks = data;
//       })
//       .catch(function(err) {
//         console.log(err);
//       })
//   }
//   $scope.getBookmarks();
// });

