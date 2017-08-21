//main app configuration
var flashApp = angular.module('flashbulbApp',['appRoutes','userControllers','userService','ngAnimate','ngMaterial', 'mainController', 'mainService'])
flashApp.config(function() {


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

  flashApp.filter('customOrder', function() {
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
})
