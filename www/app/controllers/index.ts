'use strict';

var angular = require('angular');

angular.module('app')
  .controller('calloutCtrl', require('./calloutCtrl'))
  .controller('detailsCtrl', require('./detailsCtrl'))
  .controller('headerCtrl', require('./headerCtrl'))
  .controller('homeCtrl', require('./homeCtrl'))
  .controller('sidebarCtrl', require('./sidebarCtrl'))
  .controller('tagsCtrl', require('./tagsCtrl'));
