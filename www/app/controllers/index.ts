'use strict';

var angular = require('angular');

angular.module('app')
  .controller('calloutController', require('./callout.controller'))
  .controller('detailsController', require('./details.controller'))
  .controller('homeController', require('./home.controller'))
  .controller('sidebarController', require('./sidebar.controller'))
  .controller('tagsController', require('./tags.controller'));
