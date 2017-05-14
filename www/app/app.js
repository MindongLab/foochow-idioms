(function () {
    "use strict";
    const path = require('path');
    const url = require('url');

    const dataurl = url.format({
        pathname: path.join(__dirname,'assets','data','api'),
        protocal:'file:',
        slashes:true
    });

    const audiourl = url.format({
        pathname: path.join(__dirname,'assets','audio'),
        protocal:'file:',
        slashes:true
    });

    angular.module('app', ['ngRoute'])
    .constant("SERVER_API_URL",dataurl)
    .constant("SERVER_AUDIO_URL",audiourl)
    
    .config(['$routeProvider',function ($routeProvider) {  
        $routeProvider  
            .when('/', {  
                templateUrl: 'app/views/welcome.tpl.html',  
                controller: 'homeCtrl'  
            })  
            .when('/idiom/:idiomtext/id/:idiomid*', {  
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
    
}());

