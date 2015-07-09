(function () {
  'use strict';

  angular
    .module('etsy')
    .controller('MainController', function ($scope, MainService, $routeParams, _) {
        $scope.hello= "hello World";
    })


})();
