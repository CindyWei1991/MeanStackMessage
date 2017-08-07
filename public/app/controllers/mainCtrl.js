angular.module('mainController',[])
.controller ('mainCtrl', function($location, $scope, $timeout) {
	$scope.logout = function() {
		 $location.path('/logout');
		 $timeout(function () {
		 	    $location.path('/');
		 }, 2000);
	};
});