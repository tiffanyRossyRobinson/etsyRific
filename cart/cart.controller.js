(function() {
  'use strict';

  angular
    .module('cart')
    .controller('CartController', function ($scope, CartService, $window, $location, _) {
    if($location.url() === '/myCart'){
          CartService.getFromCart().then(function (cartItems) {
            console.log("this is the data: ", cartItems);
                $scope.cartItems = cartItems.data;
              })
    }

      $scope.cartTotal = function(items){
          var cartTotal = 0;
          _.each(items, function(e){ cartTotal += Number(e.price); });
          return cartTotal;
      }

      $scope.addToCart = function (itemToCart) {
            CartService.addToCart(itemToCart);
      };

      $scope.removeFromCart = function(id){
          CartService.removeFromCart(id);
      }

      var watchCallback = function () {
        console.log("we are in our watCallBack");
        CartService.getFromCart().success(function (cartItems) {
              $scope.cartItems = cartItems;
            });
            $scope.cartTotal = function(items){
                var cartTotal = 0;
                _.each(items, function(e){ cartTotal += Number(e.price); });
                return cartTotal;
            }
        };

      $scope.$on('item:deleted', watchCallback);
      $scope.$on('item:created', watchCallback);

    });
}());
