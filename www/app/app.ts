"use strict";
angular.module('app', ['ui.router'])
.constant("SERVER_API_URL","http://fiapi.radiumz.org:2052/api")
.constant("SERVER_AUDIO_URL","/assets/audio/")

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            templateUrl: 'app/views/welcome.tpl.html',
            controller: 'homeController'
        })
        .state({
            name: 'showidiom',
            url: '/idiom/{idiomtext}',
            component: 'viewIdiomPage',
            caseInsensitiveMatch: true
        })
        .state({
            name: 'showhelp',
            url: '/help',
            templateUrl: 'app/views/help.tpl.html'
            // controller: 'mainCtrl'
        })
        .state({
            name: 'showcategories',
            url: '/tags', 
            templateUrl: 'app/views/tags.tpl.html' ,
            controller: 'tagsController'
        })
        .state({
            name: 'showapps',
            url: '/apps', 
            templateUrl: 'app/views/apps.tpl.html'
        });

        $urlRouterProvider.otherwise('/');
}]);

require('./components');
require('./controllers');
require('./services');
