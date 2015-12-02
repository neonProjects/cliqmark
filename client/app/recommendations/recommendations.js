angular.module('cliqmark.recommendations', [])

.controller('RecommendationCtrl', function($scope, $location, $window, Recommendations) {
  $scope.data = {};

  $scope.getRecs= function() {
    //query bookmarks with certain tag
    //check BookmarkTags table for tags


  };

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


  setInterval($scope.getBookmarks, 5000);

});
