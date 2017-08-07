angular.module('userService', [])

.factory('userFactory', function($http) {
	var _userService = {};
	_userService.createUser = function(body) {
			return $http.post('/api/register', body);
	};

	_userService.loginUser = function(body) {
		return $http.post('/api/login', body)
	};
	return _userService;
})

.factory('tokenFactory', function() {
	var _tokenService = {};
	_tokenService.setToken = function(token) {
		$windoww.localStorage.setItem()
	}
  return _tokenService;

});