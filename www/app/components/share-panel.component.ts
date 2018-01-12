'use strict';

$ = require('jquery');
function SharePanelController($scope) {
    
    this.$onInit = function (){
        $(".ms-Panel").Panel();
    }
};

SharePanelController.$inject = ['$scope'];

var SharePanel = {
    template: require('./share-panel.component.html'),
    controller: SharePanelController
}

module.exports = SharePanel;