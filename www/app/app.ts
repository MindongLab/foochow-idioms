"use strict";
angular.module('app', ['ngRoute'])
.constant("SERVER_API_URL","http://fiapi.radiumz.org:2052/api")
.constant("SERVER_AUDIO_URL","/assets/audio/")

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/welcome.tpl.html',
            controller: 'homeController'
        })
        .when('/idiom/:idiomtext*', {
            templateUrl: 'app/views/showDetails.tpl.html',
            controller: 'detailsController',
            caseInsensitiveMatch: true
        })
        .when('/help', {
            templateUrl: 'app/views/help.tpl.html'
            // controller: 'mainCtrl'
        })
        .when('/tags', {
            templateUrl: 'app/views/tags.tpl.html' ,
            controller: 'tagsController'
        })
        .when('/apps', {
            templateUrl: 'app/views/apps.tpl.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

require('./components');
require('./controllers');
require('./services');
