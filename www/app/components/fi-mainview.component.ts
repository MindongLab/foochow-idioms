'use strict';

function FiMainviewController($scope) {

};

FiMainviewController.$inject = ['$scope'];

var FiMainview = {
    template: require('./fi-mainview.component.html'),
    controller: FiMainviewController
}

module.exports = FiMainview;