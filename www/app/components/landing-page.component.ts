'use strict';

function LandingPageController($scope, $rootScope, $location, kageService) {
    var ctrl = this;

    ctrl.featureClicked = function (id) {
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
                $rootScope.$emit("toggleSidebar", {'state': false});
                break;
            case 3:
                $location.path('/help');
                $rootScope.$emit("toggleSidebar", {'state': false});
                break;
        }
    };

};

LandingPageController.$inject = ['$scope', '$rootScope', '$location', "KageService"];

var LandingPage = {
    template: require('./landing-page.component.html'),
    controller: LandingPageController
}

module.exports = LandingPage;