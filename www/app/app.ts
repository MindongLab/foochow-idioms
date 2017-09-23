"use strict";
angular.module('app', ['ngRoute'])
.constant("SERVER_API_URL","http://127.0.0.1:5000/api")
.constant("SERVER_AUDIO_URL","/assets/audio/")

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/welcome.tpl.html',
            controller: 'homeCtrl'
        })
        .when('/idiom/:idiomtext*', {
            templateUrl: 'app/views/showDetails.tpl.html',
            controller: 'detailsCtrl',
            caseInsensitiveMatch: true
        })
        .when('/help', {
            templateUrl: 'app/views/help.tpl.html'
            // controller: 'mainCtrl'
        })
        .when('/tags', {
            templateUrl: 'app/views/tags.tpl.html' ,
            controller: 'tagsCtrl'
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
