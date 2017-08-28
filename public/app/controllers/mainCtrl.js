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
			$rootScope.user = data.data.user;
		} else {
			$scope.user.userName = "";
			$rootScope.userLoggedIn = false;
		}
	});
})



.controller("flashbulbCtrl",function($scope, $http, $rootScope, $location, $timeout, mainFactory, $mdSidenav, userFactory) {
	$scope.sendingMessage = {};
	$scope.sendingMessage.sendor = $rootScope.user;
	$scope.sendingMessage.receiver = {};
	$scope.user = {};
	userFactory.getUser().then(function(data) {
		if (data.data.success) {
			$rootScope.userLoggedIn = true;
			$scope.user.userName = data.data.user.userName;
			$rootScope.user = data.data.user;
		} else {
			$scope.user.userName = "";
			$rootScope.userLoggedIn = false;
		}
	});

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

	mainFactory.getMessages().then(function(data) {
		if (data.data.success) {
			$scope.messages = data.data.message;
			console.log(data);
		} else {
			console.log("no message")
		}
	});
	//get the count of each category's messages
	mainFactory.getMessageCount("fire").then(function(data) {
		if (data.data.success) {
			$scope.fireCount = data.data.count;
		} else {
			console.log("no message")
		}
	});

	mainFactory.getMessageCount("blocker").then(function(data) {
		if (data.data.success) {
			$scope.blockerCount = data.data.count;
		} else {
			console.log("no message")
		}
	});

	mainFactory.getMessageCount("goodNews").then(function(data) {
		if (data.data.success) {
			$scope.goodNewsCount = data.data.count;
		} else {
			console.log("no message")
		}
	});

	mainFactory.getMessageCount("info").then(function(data) {
		if (data.data.success) {
			$scope.infoCount = data.data.count;
		} else {
			console.log("no message")
		}
	});
	$scope.getPanelClass = function(category) {
		switch(category) {
			case "fire":
				return "panel-danger";
			case "blocker":
				return "panel-warning";
			case "goodNews":
				return "panel-success";
			case "info":
				return "panel-info";
		}
	}
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
		location.replace("/index.html");
	};

	$scope.sendMessage = function() {
		$scope.sendingMessage.category = $scope.selectedCategory;
		console.log($scope.sendingMessage);
		$http
		({method: 'POST',
   			url: '/api/send/sendMessage',
    		data: $scope.sendingMessage
    	})
		.then(function(res) {
			location.replace("/");
		}).then(function(error){
			console.log(error);
		})
	};
	
	  $scope.toggleLeft = function() {
		  $mdSidenav("left")
			.toggle();
	  };
	  
	  $scope.close = function () {
		$mdSidenav('left').close();
	  };
  
})