'use strict';

function HelpPageController($scope, CI_BUILD_NUMBER, CI_COMMIT_HASH) {
    this.CI_BUILD_NUMBER = CI_BUILD_NUMBER;
    this.CI_COMMIT_HASH = CI_COMMIT_HASH;
    
};

HelpPageController.$inject = ['$scope', 'CI_BUILD_NUMBER', 'CI_COMMIT_HASH'];

var HelpPage = {
    template: require('./help-page.component.html'),
    controller: HelpPageController
}

module.exports = HelpPage;