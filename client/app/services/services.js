angular.module('beer-tab.services', [])

.factory('AuthService', function ($http, $location, $window) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (resp) {
        return resp.data.token;
      });
  };
 
  authService.signup = function(credentials) {
    return $http
      .post('/signup', credentials)
      .then(function (resp) {
        return resp.data.token;
      });
  };

  authService.isAuth = function () {
    return !!$window.localStorage.getItem('com.beer-tab');
  };

  authService.signout = function () {
    $window.localStorage.removeItem('com.beer-tab');
    $location.path('/login');
  };

  return authService;
})


.factory('beerPmt', function ($window, $http) {
  var newIOU = function (user) {
    return $http({
      method: 'POST',
      url: '/tabs',
      data: {token: $window.localStorage.getItem('com.beer-tab'), user: user}
    });
  };

  var recievePmt = function (user) {
    return $http({
      method: 'POST',
      url: '/paid',
      data: {token: $window.localStorage.getItem('com.beer-tab'), user: user}
    });
  };

  return {
    newIOU: newIOU,
    recievePmt: recievePmt
  };
});




