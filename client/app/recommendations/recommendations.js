angular.module('cliqmark.recommendations', [])

.controller('RecommendationCtrl', function($scope, $location, $window, Recommendations) {
  $scope.data = {};

  $scope.getRecs= function() {
    //call getRecs from from Recommendations factory
    //set $scope.data.recs = data;


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
