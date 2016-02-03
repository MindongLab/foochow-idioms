(function () {
    "use strict";
    angular.module('app').controller('homeCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $scope.featureClicked = function (id) {
            switch(id)
            {
                case 1:  //List All
                    //show sideBar
                    $rootScope.$emit("toggleSidebar", {'state':true});
                    //remove tag filter
                    $rootScope.$emit("switchToTag", {'tag':""});
                    break;
                case 2:
                    break;
                case 3:
                    $location.path('/help');
                    $rootScope.$emit("toggleSidebar", {'state':false});
                    break;
            }
        }
        
    }]);
}());
