//todo move the bookmark controller in here
angular.module('cliqmark.bookmarks', [])

.controller('BookmarksController', function($scope, $location, $window, Bookmarks) {
  $scope.data = {};
  $scope.getBookmarks = function() {
    //todo: replace this fake data with real call to DB
    // var data = Bookmarks.getData();
    // $scope.data.bookmarks = data;
    Bookmarks.getData()
      .then(function(data) {
        $scope.data.bookmarks = data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('cliqmark_user');
    $window.localStorage.removeItem('cliqmark_token');
    $location.path('/login');
  }

  $scope.getBookmarks();
});