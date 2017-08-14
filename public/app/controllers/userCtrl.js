angular.module('userControllers', [])
.controller('registerController', function($scope, $timeout, $location, userFactory) {
	$scope.registerUser = function() {
		$scope.warning = {};
		$scope.warning.loading = true;
		$scope.warning.errorMessage = false;
	  userFactory.createUser($scope.user).then(function(data) {
			if (data.data.success) {
				$scope.warning.loading = false;
				$scope.warning.successMessage = data.data.message + "Redirecting";
				$timeout(function() {
					$location.path('/');
				}, 2000);
			} else {
				$scope.warning.loading = false;
				$scope.warning.errorMessage = data.data.message;
			}
		});
	};
})

.controller('loginController', function($scope,$timeout, $location, userFactory) {
	$scope.login = function() {
		$scope.warning = {};
		$scope.warning.loading = true;
		$scope.warning.errorMessage = false;
		userFactory.loginUser($scope.user).then(function(data) {
			console.log(data)
			if (data.data.success) {
				$scope.warning.loading = false;
				$scope.warning.successMessage = data.data.message + "Redirecting";
				$timeout(function() {
					$location.path('/');
				}, 2000);
			} else {
				$scope.warning.loading = false;
				$scope.warning.errorMessage = data.data.message;
			}
		})
	}
	
})

.controller('googleController', function($scope,$timeout, $location, userFactory) {
	$scope.login = function() {
		$scope.warning = {};
		$scope.warning.loading = true;
		$scope.warning.errorMessage = false;
		userFactory.loginUser($scope.user).then(function(data) {
			console.log(data)
			if (data.data.success) {
				$scope.warning.loading = false;
				$scope.warning.successMessage = data.data.message + "Redirecting";
				$timeout(function() {
					$location.path('/');
				}, 2000);
			} else {
				$scope.warning.loading = false;
				$scope.warning.errorMessage = data.data.message;
			}
		})
	}
	
})