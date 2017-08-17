angular.module('mainController',[])
.controller ('mainCtrl', function($location, $scope, $rootScope, $timeout, userFactory, $window) {
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
	$scope.google = function() {
		$window.location = $window.location.protocol + "//" + $window.location.host + '/auth/google'
	}
	$scope.user = {};
	userFactory.getUser().then(function(data) {
		if (data.data.success) {
			$rootScope.userLoggedIn = true;
			$scope.user.userName = data.data.user.userName;
		} else {
			$scope.user.userName = "";
			$rootScope.userLoggedIn = false;
		}
	});
})



.controller("flashbulbCtrl",function($scope, $http) {
	$http.get('/messages').then(function(data) {
		$scope.messages = data.data.message;
	});
	$scope.getCategoryImg = function (category) {
		switch(category) {
			case "fire":
				return "media/imgs/fire.png";
			case "blocker":
				return "media/imgs/blocker.png";
			case "goodNews":
				return "media/imgs/goodnews.png";
			case "info":
				return "media/imgs/info.png";
		}
	};

	$scope.getMessages = function (category) {
		if ($scope.filterCategory && $scope.filterCategory == category) {
			$scope.filterCategory = ""
		} else {
			$scope.filterCategory = category
		}
	};

	$scope.getActive = function (category) {
		return category == $scope.filterCategory
	}

	
	//below are for send page
	$scope.selectedCategory = "fire";
	$scope.placeholderMessage = "What's the emergency?"
	$scope.setCategory = function(category) {
		$scope.selectedCategory = category;
		$scope.placeholderMessage = "What's the emergency?"
		switch(category) {
			case "fire":
				$scope.placeholderMessage = "What's the emergency?"
				break;
			case "blocker":
				$scope.placeholderMessage = "What's the blocker?"
				break;
			case "goodNews":
				$scope.placeholderMessage = "What's the good news you want to share?"
				break;
			case "info":
				$scope.placeholderMessage = "What's the infomation you want to share?"
		}
		
	};
	$scope.isActiveForSend = function(category) {
		return category == $scope.selectedCategory
	};
	$scope.gotoIndex = function() {
		location.replace("/index.html")
	}

	$scope.sendMessage = function() {
		$scope.sendingMessage.category = $scope.selectedCategory
		$scope.sendingMessage.sender={"name":"Test Account","avartar": "media/imgs/avata-woman.png"}
		console.log($scope.sendingMessage);
		$http
		({method: 'POST',
   			url: '/api/send/sendMessage',
    		data: $scope.sendingMessage
    	})
		.then(function(res) {
			location.replace("/")
		}).then(function(error){
			console.log(error)
		})
	}
})