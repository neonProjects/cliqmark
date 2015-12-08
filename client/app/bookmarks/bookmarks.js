angular.module('cliqmark.bookmarks', [])

.controller('BookmarksController', function($scope, $location, $window, Bookmarks) {
  $scope.data = {};
  $scope.getBookmarks = function() {
    Bookmarks.getData()
      .then(function(data) {
        $scope.data.bookmarks = data;
        //console.log("this is data",data);
       
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('cliqmark_user');
    $window.localStorage.removeItem('cliqmark_token');
    $location.path('/login');
  };



  $scope.getBookmarks();


  setInterval($scope.getBookmarks, 15000);

});
