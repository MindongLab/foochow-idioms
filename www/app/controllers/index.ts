'use strict';

var angular = require('angular');

angular.module('app')
  .controller('homeController', require('./home.controller'))
  .controller('tagsController', require('./tags.controller'));
