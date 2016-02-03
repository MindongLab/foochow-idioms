(function ($) {
    "use strict";
    angular.module('app').controller('headerCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $scope.homeClicked = function () {
            $location.path('/');
            $rootScope.$emit('toggleSidebar', {'state':false});
        };
        
        $scope.aboutClicked = function () {
            $location.path('/about');
            $rootScope.$emit('toggleSidebar', {'state':false});
        };
        
        $scope.helpClicked = function () {
            $location.path('/help');
            $rootScope.$emit('toggleSidebar', {'state':false});
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