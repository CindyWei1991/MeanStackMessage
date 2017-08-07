angular.module('userControllers', [])
.controller('registerController', function($scope, $http, $timeout, $location) {
	$scope.registerUser = function() {
		$scope.loading = true;
		$scope.errorMessage = false;
		$http.post('/api/users', $scope.user).then(function(data) {
			console.log(data)
			if (data.data.success) {
				$scope.loading = false;
				$scope.successMessage = data.data.mesage + "Redirecting";
				$timeout(function() {
					$location.path('/');
				}, 2000);
			} else {
				$scope.loading = false;
				$scope.errorMessage = data.data.message;
			}
		});
	};
});