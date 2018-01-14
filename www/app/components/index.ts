'use strict';

var angular = require('angular');

angular.module('app')
    .component('canvasCharacter', require('./canvas-character.component'))
    .component('fiHeader', require('./header.component'))
    .component('fiMainview', require('./fi-mainview.component'))
    .component('fiSidebar', require('./fi-sidebar.component'))
    .component('viewIdiomPage', require('./view-idiom-page.component'))
    .component('appsPage', require('./apps-page.component'))
    .component('helpPage', require('./help-page.component'))
    .component('landingPage', require('./landing-page.component'))
    .component('categoryPage', require('./category-page.component'))
    .component('sharePanel', require('./share-panel.component'));