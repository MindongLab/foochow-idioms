(function () {
    "use strict";
    angular.module('app', ['ngRoute'])
    .constant("SERVER_API_URL","http://127.0.0.1:5000/api")
    .constant("SERVER_AUDIO_URL","http://mindonglab.github.io/foochow-idioms-audio/audio/")
    
    .config(['$routeProvider',function ($routeProvider) {  
        $routeProvider  
            .when('/', {  
                templateUrl: 'app/views/welcome.tpl.html',  
                controller: 'mainCtrl'  
            })  
            .when('/showDetails', {  
                templateUrl: 'app/views/showDetails.tpl.html',  
                controller: 'mainCtrl'  
            })  
            .otherwise({  
                redirectTo: '/'  
            });  
    }]); 
    
}());

