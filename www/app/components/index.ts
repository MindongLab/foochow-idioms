'use strict';

var angular = require('angular');

angular.module('app')
    .component('playerButton', require('./player-button.component'))
    .component('canvasCharacter', require('./canvas-character.component'))
    .component('fiHeader', require('./header.component'));