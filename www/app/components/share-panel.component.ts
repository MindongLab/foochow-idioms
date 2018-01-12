'use strict';

$ = require('jquery');
function SharePanelController() {

    this.$onInit = function () {
        $(".ms-Panel").Panel();
    }
};

var SharePanel = {
    template: require('./share-panel.component.html'),
    controller: SharePanelController
}

module.exports = SharePanel;