'use strict';

var angular = require('angular');

angular.module('app')
  .factory('DataService', require('./DataService'))
  .factory('KageService', require('./KageService'));