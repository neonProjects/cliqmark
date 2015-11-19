// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('cliqmark.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (storageItem) {
        $window.localStorage.setItem('cliqmark_user', storageItem.userId);
        $window.localStorage.setItem('cliqmark_token', storageItem.token);
        $location.path('/bookmarks');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (storageItem) {
        $window.localStorage.setItem('cliqmark_user', storageItem.userId);
        $window.localStorage.setItem('cliqmark_token', storageItem.token);
        $location.path('/bookmarks');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
