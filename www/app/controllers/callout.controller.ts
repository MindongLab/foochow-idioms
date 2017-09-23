'use strict';

CalloutController.$inject = ['$scope', '$rootScope', '$location'];
var $ = require('jquery');
    
function CalloutController($scope, $rootScope, $location) {
    $scope.closeButtonClicked = function () {
        $rootScope.$emit('CalloutHide');
        $('.shareCallout').addClass('calloutHide').removeClass('calloutShow');
    };
};

module.exports = CalloutController;