(function ($) {
    "use strict";
    angular.module('app').controller('headerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.homeClicked = function () {
            $rootScope.$emit('switchToHome');

        };
        
        $scope.aboutClicked = function () {
            $rootScope.$emit('switchToAbout');    
        };
        
        $scope.helpClicked = function () {
            $rootScope.$emit('switchToHelp');    
        };
        
        $scope.init = function () {
            $(".ms-CommandBar").CommandBar();
        };     
        
        $scope.hamburgerClicked = function () {
            $rootScope.$emit('toggleSidebar');
        };      
    }]);
}(jQuery));