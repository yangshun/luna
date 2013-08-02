'use strict';

angular.module('luna', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'templates/landing.html', controller: LandingCtrl}).
    when('/posts', {templateUrl: 'templates/all-posts.html', controller: AllPostsCtrl}).
    when('/:post_id', {templateUrl: 'templates/single-post.html', controller: SinglePostCtrl}).
    otherwise({redirectTo: '/'});
}]);

function LandingCtrl($scope, $http) {
  $http.get('content/posts.json').success(function(data) {
    $scope.posts = data;
  });

  $scope.orderProp = 'age';
}

function AllPostsCtrl($scope, $http) {
  $http.get('content/posts.json').success(function(data) {
    $scope.posts = data;
  });

  $scope.orderProp = 'age';
}

function SinglePostCtrl($scope, $routeParams, $http) {
  console.log($routeParams.post_id);
  $http.get('posts/' + $routeParams.post_id + '.md').success(function(data) {
    console.log(data);
    $scope.content = converter.makeHtml(data);
  });
}
