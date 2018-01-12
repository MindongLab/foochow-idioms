"use strict";
angular.module('app', ['ui.router'])
.constant("SERVER_API_URL","http://fiapi.radiumz.org:2052/api")
.constant("SERVER_AUDIO_URL","/assets/audio/")

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            component: 'landingPage'
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
            component: 'helpPage'
        })
        .state({
            name: 'showcategories',
            url: '/tags', 
            component: 'categoryPage'
        })
        .state({
            name: 'showapps',
            url: '/apps', 
            component: 'appsPage'
        });

        $urlRouterProvider.otherwise('/');
}]);

require('./components');
require('./services');
