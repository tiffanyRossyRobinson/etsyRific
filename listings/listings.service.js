(function() {
  'use strict';

  angular
  .module('list')
  .factory('ListService', function ($http, _, moment, $q, $cacheFactory) {

      var cacheEngine = $cacheFactory('AwesomeListings')
      var urlOpts = {
        baseUrl: 'https://openapi.etsy.com/v2/',
        method: 'listings/active.js?includes=MainImage',
        apiKey: 'w0esvqfw4jwj1rivm3k62viw',
        buildUrl: function () {
          return this.baseUrl + this.method + '&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
        }
      };


      var getActiveListings = function () {
        var deferred = $q.defer();
        var cache = cacheEngine.get('listings');
        if(cache){
          deferred.resolve(cache);
        }
        else{
            $http.jsonp(urlOpts.buildUrl()).then(function (listings) {
              var listingsArray = listings.data.results;
               cacheEngine.put('listings', mapDataToObjects(listingsArray));
               deferred.resolve(mapDataToObjects(listingsArray));
          });
        };
        return deferred.promise;
      };

      // var keyOpts = function(key){
      //   var url = 'https://openapi.etsy.com/v2/' + 'listings/active.js?includes=MainImage' + '&api_key=' + 'w0esvqfw4jwj1rivm3k62viw' + "&keywords=" + key.val + '&callback=JSON_CALLBACK';
      //   return url;
      // };
      //
      // var getKey = function(keys){
      //     var url = keyOpts(keys);
      //     $http.jsonp(url).success(function (listings) {
      //       var listingsArray = listings.data.results;
      //        return mapDataToObjects(listingsArray);
      //     });
      // };



      var oneUrlOpt = {
        baseUrl: 'https://openapi.etsy.com/v2/',
        method: 'listings/',
        apiKey: 'w0esvqfw4jwj1rivm3k62viw',
        buildUrl: function (id) {
          return this.baseUrl + this.method + id + '.js?includes=MainImage&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
        }
      };

      var getListing = function (id) {
        var deferred = $q.defer();
        var cache = cacheEngine.get('listings');
        if(cache){
          var item = {};
          _.each(cache, function(e){
            if(e.id === Number(id)){
              item = e;
            }
          })
          deferred.resolve(item)
        }
        else{
          //calling individual url keeps you from having to load all the listings. However you will need to run a request again when you go home, but if they are looking for an item that is no longer in the top active listings they can still access... goods and bads
          $http.jsonp(oneUrlOpt.buildUrl(id)).then(function (listing) {
            deferred.resolve(mapDataToObjects(listing.data.results)[0]);
          });
        }
        return deferred.promise;

      };

      var mapDataToObjects = function (collection) {
        return _.map(collection, function (obj) {
            return {image: obj.MainImage.url_fullxfull ? obj.MainImage.url_fullxfull : "http://www.fillmurray.com/200/200", title: obj.title, id: obj.listing_id, lastModDt: moment.unix(obj.last_modified_tsz).fromNow(), price: obj.price, currency: obj.currency_code, materials: obj.materials, keywords: obj.tags, link: obj.url, description: obj.description};
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
        // getKey: getKey
        // sortData: sortData
      };
  })
}());
