'use strict';

angular.module('luna', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'templates/landing.html', controller: LandingCtrl}).
    when('/posts', {templateUrl: 'templates/all-posts.html', controller: AllPostsCtrl}).
    when('/:post_id', {templateUrl: 'templates/single-post.html', controller: SinglePostCtrl}).
    when('/page/:page', {templateUrl: 'templates/landing.html', controller: LandingCtrl}).
    otherwise({redirectTo: '/'});
}]);

function LunaBlogCtrl($scope, $http) {

  $scope.fetchPosts = function(cb) {
    if (!$scope.posts) {
      $http.get('content/posts.json').success(function(data) {
        $scope.posts = data;
        for (var i = 0; i < $scope.posts.length; i++) {
          $scope.posts[i].content = converter.makeHtml($scope.posts[i].content);
          var d = new Date($scope.posts[i].timestamp * 1000);
          $scope.posts[i].date = d.toString();
        }
        console.log('loading done');
        applyCb(cb);
      });
    } else {
      applyCb(cb);
    }
    function applyCb(cb) {
      if (cb) { cb(); } else { return; }
    }
  };
}

function LandingCtrl($scope, $routeParams) {
  console.log('landing ctrl init');
  $scope.$parent.fetchPosts(getPagePosts);
  
  function getPagePosts() {
    if ($scope.posts) {
      $scope.current_page = $routeParams.page ? parseInt($routeParams.page) : 1;
      $scope.prev_page = $scope.current_page - 1 > 0 ? $scope.current_page - 1 : undefined;
      $scope.next_page = ($scope.current_page * CONFIG.NUM_POSTS_PER_PAGE) < $scope.posts.length ? $scope.current_page + 1 : undefined;
      var starting_index = Math.max($scope.current_page - 1, 0) * CONFIG.NUM_POSTS_PER_PAGE;
      $scope.current_page_posts = $scope.posts.slice(starting_index, starting_index + CONFIG.NUM_POSTS_PER_PAGE);
      $scope.orderProp = 'timestamp';
      console.log('current page posts init');
    }
  }
}

function AllPostsCtrl($scope) {
  $scope.$parent.fetchPosts(function() {
    $scope.orderProp = 'timestamp';
  });
}

function SinglePostCtrl($scope, $routeParams) {
  
  $scope.post_loaded = false;
  $scope.newer_post_id = undefined;
  $scope.older_post_id = undefined;
  $scope.$parent.fetchPosts(function() {
    $scope.current_post = findPostFromPostId($routeParams.post_id);
  });

  function findPostFromPostId(post_id) {
    for (var i = 0; i < $scope.$parent.posts.length; i++) {
      if ($scope.$parent.posts[i].post_id === post_id) {
        console.log(i);
        $scope.post_loaded = true;
        $scope.newer_post_id = i - 1 >= 0 ? $scope.$parent.posts[i-1].post_id : undefined;
        $scope.older_post_id = i + 1 <= $scope.$parent.posts.length - 1 ? $scope.$parent.posts[i+1].post_id : undefined;

        return $scope.$parent.posts[i];
      }
    }
    return ''; // TODO: Redirect to a 404 page
  }
}