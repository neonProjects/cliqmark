var app = angular.module('cliqmark', [
    'cliqmark.extension',
    'cliqmark.bookmarks',
    'cliqmark.auth',
    'cliqmark.services',
    'ngRoute'
  ]);

app.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/extension', {
      templateUrl: 'app/extension/extension.html',
      controller: 'ExtensionsController',
    })
    .when('/bookmarks', {
      templateUrl: 'app/bookmarks/bookmarks.html',
      controller: 'BookmarksController',
      authenticate: true
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
})

.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      console.log("Routing and authing!")
      $location.path('/login');
    }
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

