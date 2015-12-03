angular.module('cliqmark.categories', [])

.controller('BookmarksController', function($scope, $location, $window, Bookmarks) {
  $scope.data = {};
  $scope.addTag = function() {
    Bookmarks.getData()
      .then(function(data) {
        $scope.data.tags = data;
        //console.log("this is data",data);
       
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  


  $scope.addTag();


  setInterval($scope.addTag(), 15000);

});