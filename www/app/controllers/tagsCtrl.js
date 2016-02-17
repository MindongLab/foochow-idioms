(function () {
    "use strict";
    angular.module('app').controller('tagsCtrl', ['$scope', '$rootScope', '$location', "DataService", function ($scope, $rootScope, $location, dataService) {
        dataService.getAllTags().then(function (r) {
             $scope.list =r;
        })
        $scope.tagClicked = function (tagName) {
            $rootScope.$emit("switchToTag", {'tag': tagName});
            $rootScope.$emit("toggleSidebar", {'state': true});
        };
        
    }]);
}());
