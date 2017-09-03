'use strict';

CalloutCtrl.$inject = ['$scope', '$rootScope', '$location'];
$ = require('jquery');
    
function CalloutCtrl($scope, $rootScope, $location) {
    $scope.closeButtonClicked = function () {
        $rootScope.$emit('CalloutHide');
        $('.shareCallout').addClass('calloutHide').removeClass('calloutShow');
    };
};

module.exports = CalloutCtrl;