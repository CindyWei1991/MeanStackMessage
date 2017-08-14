var app = angular.module("flashbulb",["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
        templateUrl: 'index.html',
        controller: 'flashbulbCtrl',
      })
	 .when('/send', {
        templateUrl: 'send.html',
        controller: 'flashbulbCtrl',
      })
});

function categoryOrder(item) {
    switch(item) {
      case 'fire':
        return 4;

      case 'blocker':
        return 3;

      case 'goodNews':
        return 2;
      case 'info':
        return 1;
    }  
  }

app.filter('customOrder', function() {
	return function(items, field) {
		var filtered = [];
    	angular.forEach(items, function(item) {
      		filtered.push(item);
    	});
		filtered.sort(function(a,b) {
			return (categoryOrder(b[field]) > categoryOrder(a[field]) ? 1 : -1)
		});

		return filtered;

	}
});


app.controller("flashbulbCtrl",function($scope, $http) {
	$http.get('/messages').then(function(data) {
		$scope.messages = data.data.message;
	});
	// $http.get('http://flashbulb-api2-dev2.azurewebsites.net/api.php?action=get_message&uid=4').then(
	// 	function(data) {
	// 		console.log(data)
	// 	})
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
   			url: '/send/sendMessage',
    		data: $scope.sendingMessage
    	})
		.then(function(res) {
			location.replace("/")
		}).then(function(error){
			console.log(error)
		})
	}
})