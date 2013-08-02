'use strict';

angular.module('luna', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'templates/landing.html', controller: LandingCtrl}).
    when('/posts', {templateUrl: 'templates/all-posts.html', controller: AllPostsCtrl}).
    when('/:post_id', {templateUrl: 'templates/single-post.html', controller: SinglePostCtrl}).
    otherwise({redirectTo: '/'});
}]);

function LunaBlogCtrl($scope, $http) {
  $http.get('content/posts.json').success(function(data) {
    $scope.posts = data;
    // for (var i = 0; i < $scope.posts.length; i++) {
    //   fetchFullPostContent(i);
    // }
    // function fetchFullPostContent(index) {
    //   $http.get('posts/' + $scope.posts[index].route + '.md').success(function(data) {
    //     $scope.posts[index].content = converter.makeHtml(data);
    //   });
    // }
  });
}

function LandingCtrl($scope, $http) {

  $scope.orderProp = 'timestamp';
}

function AllPostsCtrl($scope, $http) {
  $http.get('content/posts.json').success(function(data) {
    $scope.posts = data;
  });

  $scope.orderProp = 'timestamp';
}

function SinglePostCtrl($scope, $routeParams, $http) {

  function findFileNameFromPostId(post_id) {
    console.log($scope.$parent.posts);
    for (var i = 0; i < $scope.$parent.posts.length; i++) {
      if ($scope.$parent.posts[i].post_id === post_id) {
        var filename = $scope.$parent.posts[i].filename;
        return filename;
      }
    }
    return ''; // TODO: Redirect to a 404 page
  }
  $http.get('posts/' + findFileNameFromPostId($routeParams.post_id)).success(function(data) {
    console.log(data);
    $scope.content = converter.makeHtml(data);
  });
}
