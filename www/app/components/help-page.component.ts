'use strict';

function HelpPageController($scope) {

};

HelpPageController.$inject = ['$scope'];

var HelpPage = {
    template: require('./help-page.component.html'),
    controller: HelpPageController
}

module.exports = HelpPage;