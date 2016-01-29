(function ($) {
    "use strict";
    angular.module('app').controller('headerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.homeClicked = function () {
            $rootScope.$emit('');
            $scope.init = function () {
                
            };
        };
        
        $scope.hamburgerClicked = function () {
            $rootScope.$emit('toggleSidebar');
        };
    }]);
}(jQuery));