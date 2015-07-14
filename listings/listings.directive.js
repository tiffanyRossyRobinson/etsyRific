(function() {
  'use strict';
  angular
    .module('list')
    .directive('single', function(){
      return{
        restrict: 'E',
        templateUrl: 'listings/views/SingleItemView.html',
        scope: {
          i: '=',
          action: '&'
        }
      }
    })
})();
