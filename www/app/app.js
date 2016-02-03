(function () {
    "use strict";
    angular.module('app', ['ngRoute'])
    .constant("SERVER_API_URL","http://127.0.0.1:5000/api")
    .constant("SERVER_AUDIO_URL","http://mindonglab.github.io/foochow-idioms-audio/audio/")
    
    .config(['$routeProvider',function ($routeProvider) {  
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
                templateUrl: 'app/views/help.tpl.html',  
               // controller: 'mainCtrl'  
            })
            .when('/about', {  
                templateUrl: 'app/views/about.tpl.html',  
               // controller: 'mainCtrl'  
            })      
            .otherwise({  
                redirectTo: '/'  
            });  
    }]); 
    
}());

