(function() {
  'use strict';

  angular
    .module('cart', [
      'ngRoute'
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/myCart', {
          templateUrl: 'cart/views/myCart.html',
          controller: 'CartController'
        });
    });
}());
