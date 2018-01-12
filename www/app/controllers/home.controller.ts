'use strict';

HomeController.$inject = ['$scope', '$rootScope', '$location', "KageService"];

function HomeController($scope, $rootScope, $location, kageService) {
    $scope.featureClicked = function (id) {
        switch (id)
        {
            case 1:  // List All
                // show sideBar
                $rootScope.$emit("toggleSidebar", {'state':true});
                // remove tag filter
                $rootScope.$emit("switchToTag", {'tag':""});
                break;
            case 2:
                $location.path('/tags');
                $rootScope.$emit("toggleSidebar", {'state':false});
                break;
            case 3:
                $location.path('/help');
                $rootScope.$emit("toggleSidebar", {'state':false});
                break;
        }
    };

};

module.exports = HomeController;

