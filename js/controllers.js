(function () {
  'use strict';

  angular
    .module('etsy')
    .controller('MainController', function ($scope, MainService, $routeParams, _) {

      MainService.getActiveListings().then(function (listings) {
        $scope.listings = listings;
      });

      MainService.getListing($routeParams.productId).then(function (aListing) {
        $scope.aListing = aListing;
      });
      $scope.sortData = function(sortWith, data ){
        if(sortWith === 'title'){
          $scope.listings = _.sortBy(data, function(obj, sortWith){
            return obj.title;
            });
        }
        else if(sortWith === 'price'){
          $scope.listings = _.sortBy(data, function(obj, sortWith){
            return obj.price * 100;
            });
        }
        };


    })

    .controller('CartController', function ($scope, CartService, $window, $location, _) {
      CartService.getFromCart().success(function (cartItems) {
            $scope.cartItems = cartItems;
            $scope.cartTotal = function(items){

                var cartTotal = 0;
                _.each(items, function(e){ cartTotal += Number(e.price); });
                return cartTotal;
            }
          });

      $scope.removeFromCart = function(id){
          CartService.removeFromCart(id).then(function(data){
            CartService.getFromCart().success(function (cartItems) {
                  $scope.cartItems = cartItems;
                  $scope.cartTotal = function(items){

                      var cartTotal = 0;
                      _.each(items, function(e){ cartTotal += Number(e.price); });
                      return cartTotal;
                  }
                  $window.location.reload()
                });
          })
      }

      $scope.addToCart = function (itemToCart) {
            CartService.addToCart(itemToCart);
      };


    });

})();
