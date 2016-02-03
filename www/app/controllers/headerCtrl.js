(function ($) {
    "use strict";
    angular.module('app').controller('headerCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $scope.homeClicked = function () {
            $location.path('/home');
        };
        
        $scope.aboutClicked = function () {
            $location.path('/about');
        };
        
        $scope.helpClicked = function () {
            $location.path('/help');
        };
        
        $scope.init = function () {
            $(".ms-CommandBar").CommandBar();
        };     
        
        $scope.hamburgerClicked = function () {
            $rootScope.$emit('toggleSidebar');
        }; 
        
      //  $scope.init();
    }]);
}(jQuery));