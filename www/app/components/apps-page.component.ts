'use strict';

function AppsPageController($scope) {

};

AppsPageController.$inject = ['$scope'];

var AppsPage = {
    template: require('./apps-page.component.html'),
    controller: AppsPageController
}

module.exports = AppsPage;