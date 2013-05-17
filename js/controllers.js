'use strict';

var controllers = angular.module('app.controllers',[]);

controllers.controller('MainCtrl', function( $scope, $location, $routeParams, Drink)  {
    
    $scope.drinks = Drink.list();
    console.log($scope.drinks);

    $scope.getDrink = function( drink ) {
        var newRoute = "/drinks/" + drink.id;
        $location.path( newRoute );
    };
});

controllers.controller('DrinkEditCtrl', function( $scope, $location, $routeParams, Drink ) {

    if ($routeParams.drinkid == 0) {
        $scope.pageTitle = "Add Drink";
        $scope.drink = new Drink();
        $scope.ingredient_new = [];

    } else {
        $scope.pageTitle = "Edit Drink";
        Drink.get({ drinkid: $routeParams.drinkid }).then(function (data) {
            $scope.drink = data;
        });
    }

    $scope.DrinkSave = function( drink ) {
        Drink.save( drink ).then(function (response) {
            $location.path ( '/drinks/' + response.id);
        });
    };

    $scope.DrinkDelete = function( drink ) {
        Drink.destroy( drink ).then(function(response) {
            $location.path( '/drinks' );
        });
    };

    // TODO: How to handle the ingredients the simplest way. Separate service vs inline object.
    $scope.IngredientSave = function( ingredient ) {
        $scope.drink.ingredients.push( ingredient );
        $scope.ingredient_new = [];      
    };

    $scope.IngredientDelete = function ( ingredient ) {
        Ingredient.destroy( ingredient ).then(function(response) {
            Ingredient.list({ ingredient_id: $routeParams.drinkid }).then(function( data ) {
                $scope.ingredients = data;
                console.log($scope.ingredients);
            });
            $scope.config_new = {'drinkid': $routeParams.drinkid, id: '' };     
        })
    }
});