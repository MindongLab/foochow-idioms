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
                
            }
            
            //Listen on viewChanged event
            var unbind = $rootScope.$on('viewChanged', function(){
                if ($rootScope._query) {
                    dataService.getIdiomByText($rootScope._query).then(function(r){
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
                $rootScope.$emit("viewChanged");
            }
            
            dataService.getAllIdioms().then(function(r){
                $scope.list=r;
            })
        }]);
})();