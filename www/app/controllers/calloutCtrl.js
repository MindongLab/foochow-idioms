(function ($) {
    "use strict";
    angular.module('app').controller('calloutCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $scope.closeButtonClicked = function () {
            $rootScope.$emit('CalloutHide');
            $('.shareCallout').addClass('calloutHide').removeClass('calloutShow');
        };
    }]);
}(jQuery));