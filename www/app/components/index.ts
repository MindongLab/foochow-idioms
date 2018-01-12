'use strict';

var angular = require('angular');

angular.module('app')
    .component('playerButton', require('./player-button.component'))
    .component('canvasCharacter', require('./canvas-character.component'))
    .component('fiHeader', require('./header.component'))
    .component('fiMainview', require('./fi-mainview.component'))
    .component('fiSidebar', require('./fi-sidebar.component'))
    .component('sharePanel', require('./share-panel.component'));