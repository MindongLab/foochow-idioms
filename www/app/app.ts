"use strict";
angular.module('app', ['ui.router'])
.constant("SERVER_API_URL",/** inject:SERVER_API_URL **/"http://fiapi.radiumz.org:2052/api"/** endinject **/)
.constant("SERVER_AUDIO_URL",/** inject:SERVER_AUDIO_URL **/"/assets/audio/"/** endinject **/)
.constant("CI_BUILD_NUMBER",/** inject:CI_BUILD_NUMBER **/"dev"/** endinject **/)
.constant("CI_COMMIT_HASH",/** inject:CI_COMMIT_HASH **/"dev"/** endinject **/)
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
