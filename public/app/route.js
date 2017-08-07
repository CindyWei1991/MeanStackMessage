angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})
	.when('/send', {
		templateUrl: 'app/views/pages/send.html'
	})
	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'registerController'
	})
	.otherwise ({redirectTo: '/'});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});