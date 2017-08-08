angular.module('mainController',[])
.controller ('mainCtrl', function($location, $scope, $timeout, userFactory) {
	$scope.logout = function() {
		 $location.path('/logout');
		 userFactory.logoutUser().then(function(data) {
		 		$scope.logoutMessage = data.data.message;
		 		if (data.data.success) {
		 			$timeout(function () {
		 	    	$location.path('/login');
		 			}, 2000);
		 		} else {
		 			alert($scope.logoutMessage);
		 		}
		 		
		 })
		 
	};
	$scope.user = {};
	userFactory.getUser().then(function(data) {
		if (data.data.success) {
			$scope.user.userName = data.data.user.userName;
		} else {
			$scope.user.userName = "";
		}
	});
	
	
});