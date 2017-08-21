var app = angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})
	
	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'registerController',
		authenticated: false
	})
	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'loginController',
		authenticated: false
	})
	.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html',
		authenticated: true
	})
	.when('/auth/google', {
		templateUrl: 'app/views/pages/users/social.html',
		authenticated: false
	})
	.when('/profile', {
		templateUrl: 'app/views/pages/users/profile.html',
		authenticated: true
	})
	.when('/receive', {
		templateUrl: 'app/views/pages/receive.html',
		controller: 'flashbulbCtrl',
		authenticated: true
	})
	.when('/send', {
		templateUrl: 'app/views/pages/send.html',
		controller: 'flashbulbCtrl',
		authenticated: true
	})
	.otherwise ({redirectTo: '/'});
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
//restricting the routes
//prevent the user going to unexpected urls
app.run(['$rootScope', '$location','userFactory', function($rootScope, $location,userFactory) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		userFactory.getUser().then(function(data) {
			var isLoggedIn = false;
			if (data.data.success == true) {
				isLoggedIn = true;
			}
			if (next.$$route.authenticated == true) {
				console.log(isLoggedIn)
				if (!isLoggedIn) {
					event.preventDefault();
					$location.path('/');
				}
			} else if ((next.$$route.authenticated == false)){
				if (isLoggedIn) {
					event.preventDefault();
					$location.path('/receive');
				}
			} else {
	
			}
		});
	})
}]);
