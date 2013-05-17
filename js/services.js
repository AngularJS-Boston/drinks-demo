/* Services */
var services = angular.module('app.services', [])

services.factory( 'Drink', function($http) {
  // Drink is a class which we can use for retrieving and 
  // updating data on the server
  var Drink = function(data) { angular.extend(this, data); };

  // a static method to retrieve Drink by ID
  Drink.get = function(drink) {
    return $http.get('/drinks/' + drink.drinkid).then(function(response) { return response.data; });
  };

  Drink.list = function() {
    return $http.get('/drinks/').then(function(response, status) { return response.data; })
  };

  Drink.save = function( drink ) {
    if(drink.drinkid) {
      return $http.put('/drinks/', data ).then(function(response) { return response.data; });
    } else {
      return $http.post('/drinks/', data ).then(function(response) { return response.data; });
    }
  };

  Drink.destroy = function( drink ) {
    return $http.delete('/drinks/' + drink.drinkid).then(function(response) { return response.data; })
  }

  return Drink;
});