angular.module('userService', [])

.factory('userFactory', function($http) {
	var _userService = {};
	_userService.createUser = function(body) {
			return $http.post('/api/register', body);
	};

	_userService.loginUser = function(body) {
		return $http.post('/api/login', body)
	};

	_userService.getUser = function() {
		return $http.get('/api/user')
	};

	_userService.logoutUser = function() {
		return $http.get('/api/logout')
	};

	return _userService;
})

