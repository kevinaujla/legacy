angular.module('foodly.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {

	$scope.user = {}; //this is attached to ng-model in the view

	$scope.signup = function() {
		Auth.signup($scope.user)
			.then(function(token) {
				$window.localStorage.setItem('com.semicolon', token);
        		$location.path('/');
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	$scope.signin = function() {
		Auth.signin($scope.user)
			.then(function(token) {
				$window.localStorage.setItem('com.semicolon', token);
        		$location.path('/');
			})
			.catch(function(err) {
				console.log(err);
			});
	};	

})

// get meals db.users.find()
// users.insert({username:'bob',password:'hashword',salt:'NaCl',meals:[{title:'phad thai',price:'12'},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10'}],orders:{}})
// coll.insert({username:’bob',password:'hashword',salt:'NaCl',meals:[{title:'phad thai',price:'12'},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10'}],orders:{}})
