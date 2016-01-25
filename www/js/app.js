(function () {
    "use strict";

    angular.module('app', [])
        .factory('DataService', ['$http', '$q', function($http, $q) {
            var SERVER_URL="http://127.0.0.1:5000/api"
            return {
                getAllIdioms: getAllIdioms,
                getIdiomsByTag: getIdiomsByTag,
                getIdiomByText: getIdiomByText
            };
            
            function getAllIdioms() {
                return $q.when($http.get(SERVER_URL+'/all/').then(function(r){
                        return r.data;
                    }).catch(function(){
                        console.log('DataService: Error in getAllIdioms()');
                        return $q.reject('e');
                    })
                );
            }
            
            function getIdiomsByTag(tagName) {
                return $q.when($http.get(SERVER_URL+'/tag/'+tagName).then(function(r){
                    return r.data;
                }).catch(function() {
                    return $q.reject('e');
                }));
            }
            
            function getIdiomByText(text){
                return $q.when($http.get(SERVER_URL+'/sentence/'+text).then(function(r){
                    return r.data;    
                }).catch(function(){
                    return $q.reject('e');
                }));
            }
        }])
        .controller('mainCtrl', ['$scope','$rootScope', 'DataService', function ($scope, $rootScope, dataService) {
            $scope.result='';
            $scope.detailMode=false;
            $scope.buttonClicked = function(){
                $scope.result='Working';
                dataService.getAllIdioms().then(function(r){
                    $scope.result=r;
                }).catch(function(){
                    console.log('mainCtrl: getAllIdioms failed.');
                });
                
            };
            
            $scope.tagClicked = function(tagName){
                $rootScope.$emit("switchToTag",{'tag':tagName});
            };
            
            $scope.playButtonClicked = function(filename){
                var uri = 'audio/'+filename.replace('.wma','.mp3')
                var sound = new Howl({
                    urls:[uri]
                }).play();
            };
            
            //Listen on switchToIdiom event
            var unbind = $rootScope.$on('switchToIdiom', function(e,args){
                if (args.text) {
                    dataService.getIdiomByText(args.text).then(function(r){
                        $scope.result=r;
                        $scope.detailMode=true;
                    }).catch(function(){
                        console.log('mainCtrl: view change failed.');
                    });
                }
            });
            
            $scope.$on('$destroy', unbind);
            
        }])
    
        .controller('sidebarCtrl',['$scope', '$rootScope', 'DataService',function($scope, $rootScope, dataService){
            $scope.list=[];
            
            $scope.listItemClicked= function(text){
                $rootScope._query=text;
                $rootScope.$emit("switchToIdiom", {'text':text});
            }
            
            dataService.getAllIdioms().then(function(r){
                $scope.list=r;
            })
            
            var unbind = $rootScope.$on("switchToTag", function(e,args) {
                if (args.tag)
                {
                    dataService.getIdiomsByTag(args.tag).then(function(r){
                        $scope.list=r;
                    })
                }
            })
            
            $scope.$on('$destroy', unbind);
        }])
    
        .controller('headerCtrl', ['$scope', '$rootScope', function($scope,$rootScope){
            $scope.homeClicked = function(){
                $rootScope.$emit('')
            }
        }]);
})();