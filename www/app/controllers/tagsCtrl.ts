'use strict';

TagsCtrl.$inject = ['$scope', '$rootScope', '$location', "DataService"];

function TagsCtrl($scope, $rootScope, $location, dataService) {
    dataService.getAllTags().then(function (r) {
            $scope.list =r;
    })
    $scope.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", {'tag': tagName});
        $rootScope.$emit("toggleSidebar", {'state': true});
    };

};

module.exports = TagsCtrl;

