angular.module('mainService', [])

.factory('mainFactory', function($http) {
	var _mainService = {};
	_mainService.getMessages = function() {
		return $http.get('/api/messages')
	};
	_mainService.getMessageCount = function(category) {
		return $http.get('/api/messageCount/' + category)
	}
	return _mainService;
})

