(function() {
  'use strict';
  angular
    .module('cart')
    .factory('CartService', function ($http, $rootScope) {
          var urlCart = 'http://tiy-fee-rest.herokuapp.com/collections/etsyStore';
          var addToCart = function (listing) {
            $http.post(urlCart, listing).success(function (response) {
              $rootScope.$broadcast('item:created');
              console.log(response);
            }).error(function (err) {
              console.log(err);
            });
          };
          var getFromCart = function () {
             return $http.get(urlCart);
          };

          var removeFromCart = function(id){
            return $http.delete(urlCart + '/' + id).success(function (response) {
              $rootScope.$broadcast('item:deleted');
              console.log(response);
            }).error(function (err) {
              console.log(err);
            });
          };

          return {
            addToCart: addToCart,
            getFromCart: getFromCart,
            removeFromCart: removeFromCart
          };
  });

}());
