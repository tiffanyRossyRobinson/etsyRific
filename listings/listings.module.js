(function() {
  'use strict';

    angular
      .module('list', [
        'ngRoute'
      ])
      .config(function($routeProvider){
        $routeProvider
        .when('/list', {
          templateUrl: 'listings/views/list.html',
          controller: 'ListController'
        })
        .when('/detail/:productId', {
          templateUrl: 'listings/views/product.html',
          controller: 'ListController'
        })
      })
}());
