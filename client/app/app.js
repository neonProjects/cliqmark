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
      controller: 'ExtensionController',
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
})

.directive('myNotebook', function () {
    return {
        restrict:"E",
        scope:{
            notes:'=',
            ondelete:'&'
        },
        templateUrl:"app/bookmarks/boookmarks.html",
        controller:function ($scope, $attrs) {
            $scope.deleteNote = function (id) {
                $scope.ondelete({id:id});
            }
        }
    };
})
.directive('myNote', function () {
    return {
        restrict:'E',
        scope:{
            delete:'&',
            note:'='
        },
        link:function (scope, element, attrs) {
            var $el = $(element);

            $el.hide().fadeIn('slow');

            $('.thumbnails').sortable({
                placeholder:"ui-state-highlight", forcePlaceholderSize:true
            });
        }
    };
})
.controller('NotebookCtrl', ['$scope', 'notesService', function ($scope, notesService) {
    $scope.getNotes = function () {
        return notesService.notes();
    };

    $scope.addNote = function (noteTitle) {
        if(noteTitle != '') {
            notesService.addNote(noteTitle);
            console.log("i am title");
        }
    };

    $scope.deleteNote = function (id) {
        notesService.deleteNote(id);
        console.log("i am deleting!");
    };
    
    $scope.resetForm = function() {
        $scope.noteTitle = '';            
    };
}]);




