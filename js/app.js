'use strict';
//Our app name is "drinks-app" which appears in the ng-app tag in the markup. We pass in the services and controllers.
var app = angular.module('drinks-app', ['app.controllers', 'app.services']);

//Setting up the app
app.config([ '$routeProvider', function( $routeProvider ) {

    // routes
    $routeProvider.
        when('/drinks', {
            templateUrl: 'partials/drinks_list.html',
            controller: 'MainCtrl'
        }).
        when('/drinks/:drinkid', {
            templateUrl: 'partials/drink_editor.html',
            controller: 'DrinkEditCtrl'}).
        otherwise({
            redirectTo: '/drinks', 
            templateUrl: 'partials/drinks_list.html',
            controller: 'MainCtrl'
        });

}]);

//CONTROLLERS
var controllers = angular.module('app.controllers',[]);

controllers.controller('MainCtrl', function( $scope, $location, $routeParams, Drink)  {

    $scope.drinks = Drink.list();

    $scope.getDrink = function( drink ) {
        var newRoute = "/drinks/" + drink.id;
        $location.path( newRoute );
    };
});

controllers.controller('DrinkEditCtrl', function( $scope, $location, $routeParams, Drink ) {
    if($routeParams.drinkid !== 'undefined') {
        Drink.get({ drinkid: $routeParams.drinkid }).then(function (data) {
        $scope.drink = data;
    });
    } else {
        $scope.drink = Drink.getEmpty();
    }
});

//SERVICES
var services = angular.module('app.services', [])

services.factory( 'Drink', function($http) {
    // Drink is a class which we can use for retrieving and 
    // updating data on the server
    var Drink = function(data) { angular.extend(this, data); };

    // a static method to retrieve Drink by ID
    Drink.get = function(drink) {
        return $http.get('/drinks/' + drink.drinkid).then(function(response) { return response.data; });
    };

    Drink.getEmpty = function() {
        return {};
    }

    Drink.list = function() {
        return $http.get('/drinks/').then(function(response, status) { return response.data; })
    };

    return Drink;
});
