(function() {
  'use strict';

  angular
    .module('list')
    .controller('ListController', function ($scope, ListService, $routeParams, _) {

      ListService.getActiveListings().then(function (listings) {
        $scope.listings = listings;
      });

      ListService.getListing($routeParams.productId).then(function (aListing) {
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

        // $scope.searchKeyword = function(keyword){
        //   console.log("we want to search by this: ", keyword);
        //   ListService.getKey(keyword).success(function(listings){
        //     console.log("we got back: ", listings);
        //     $scope.listings = listings;
        //   })
        // }


    })
}());
