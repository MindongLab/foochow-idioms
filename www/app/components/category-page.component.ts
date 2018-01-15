import { IdiomDataService } from "../idioms/idiom-data.service";

'use strict';

function CategoryPageController($scope, $rootScope, $location, idiomDataService) {
    var ctrl = this;
    (idiomDataService as IdiomDataService).getAllTags().subscribe(
    function (r) {
        ctrl.list = r;
    });
    
    ctrl.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", {'tag': tagName});
        $rootScope.$emit("toggleSidebar", {'state': true});
    };
}

CategoryPageController.$inject =  ['$scope', '$rootScope', '$location', "IdiomDataService"];

var CategoryPage = {
    template: require('./category-page.component.html'),
    controller: CategoryPageController
}

module.exports = CategoryPage;