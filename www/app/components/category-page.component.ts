'use strict';

function CategoryPageController($scope, $rootScope, $location, dataService) {
    var ctrl = this;
    dataService.getAllTags().then(function (r) {
        ctrl.list = r;
    })
    
    ctrl.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", {'tag': tagName});
        $rootScope.$emit("toggleSidebar", {'state': true});
    };
}

CategoryPageController.$inject =  ['$scope', '$rootScope', '$location', "DataService"];

var CategoryPage = {
    template: require('./category-page.component.html'),
    controller: CategoryPageController
}

module.exports = CategoryPage;