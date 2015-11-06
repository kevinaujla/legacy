angular.module('foodly', ['foodly.order', 'foodly.services', 'foodly.auth', 'foodly.meals', 'foodly.homepage','rating',
'ngRoute'])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController'
    })
    // .when('/', {
    //   templateUrl: 'meals/meals.html',
    //   controller: 'MealController'
    // })
    .when('/order', {
      authenticate: true,
      templateUrl: 'order/order.html', 
      controller: 'OrderController'
    })
    .when('/addmeal', {
      authenticate: true,
      templateUrl: 'addMeal/addMeal.html',
      controller: 'MealController'
    })
    .when('/', {
      templateUrl: 'homepage/homepage.html',
      controller: 'HomepageController'
    })
    .otherwise({
      redirectTo: '/'
    });

//     //additional routes here
  $httpProvider.interceptors.push(function($window) {
    return {
      request: function (config) {
            var jwt = $window.localStorage.getItem('com.semicolon');
            if (jwt) {
              config.headers['x-access-token'] = jwt;
            }
            config.headers['Allow-Control-Allow-Origin'] = '*';
            return config;
          }
        };
    });
})

.run(function ($rootScope, $location, Auth) {
  $rootScope.SearchBar = true;
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if(next.$$route && next.$$route.templateUrl === "meals/meals.html"){
      $rootScope.SearchBar = true;
    }else{
       $rootScope.SearchBar = false;     
    }
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
    if(Auth.isAuth()){
      Auth.loginorout="Logout"
    }else{
       Auth.loginorout = "Sign in";     
    }
  });
});