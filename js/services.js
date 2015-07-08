(function () {
  'use strict';
  angular
    .module('etsy')
    .factory('MainService', function ($http, _, moment) {

        var urlOpts = {
          baseUrl: 'https://openapi.etsy.com/v2/',
          method: 'listings/active.js?includes=MainImage',
          apiKey: 'w0esvqfw4jwj1rivm3k62viw',
          buildUrl: function () {
            return this.baseUrl + this.method + '&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
          }
        };


        var getActiveListings = function () {
          return $http.jsonp(urlOpts.buildUrl()).then(function (listings) {
             var listingsArray = listings.data.results;
             return mapDataToObjects(listingsArray);
          });
        };



        var oneUrlOpt = {
          baseUrl: 'https://openapi.etsy.com/v2/',
          method: 'listings/',
          apiKey: 'w0esvqfw4jwj1rivm3k62viw',
          buildUrl: function (id) {
            return this.baseUrl + this.method + id + '.js?includes=MainImage&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
          }
        };

        var getListing = function (id) {
          return $http.jsonp(oneUrlOpt.buildUrl(id)).then(function (listing) {
                return mapDataToObjects(listing.data.results)[0];
          });
        };

        var mapDataToObjects = function (collection) {
          return _.map(collection, function (obj) {
              return {image: obj.MainImage.url_fullxfull, title: obj.title, id: obj.listing_id, lastModDt: moment.unix(obj.last_modified_tsz).fromNow(), price: obj.price, currency: obj.currency_code, materials: obj.materials, keywords: obj.tags, link: obj.url, description: obj.description};
          });
        };

        // https://openapi.etsy.com/v2/listings/active.js?includes=MainImage&sort_on=price&sort_order=up&api_key=w0esvqfw4jwj1rivm3k62viw&callback=JSON_CALLBACK
        //
        // var sortData = function(sortBy, data){
        //   console.log("we need to sort by the: ", sortBy);
        //   return _.sortBy(data, function(o, sortBy) { return o.title; })
        //
        // };


        return {
          getActiveListings: getActiveListings,
          getListing: getListing,
          // sortData: sortData
        };
    })

    .factory('CartService', function ($http) {
          var urlCart = 'http://tiy-fee-rest.herokuapp.com/collections/etsyStore';
          var addToCart = function (listing) {
            $http.post(urlCart, listing).success(function (response) {
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



})();
