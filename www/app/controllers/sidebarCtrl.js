(function () {
    "use strict";
    angular.module('app').controller('sidebarCtrl', ['$scope', '$rootScope', 'DataService', function ($scope, $rootScope, dataService) {
        $scope.list = [];

        $scope.listItemClicked = function (text) {
            $rootScope._query = text;
            $rootScope.$emit("switchToIdiom", {'text': text});
        };

        dataService.getAllIdioms().then(function (r) {
            $scope.list = r;
        });

        var unbind = $rootScope.$on("switchToTag", function (e, args) {
            if (args.tag) {
                dataService.getIdiomsByTag(args.tag).then(function (r) {
                    $scope.list = r;
                });
            }
        });

        $scope.$on('$destroy', unbind);
    }]);
}());