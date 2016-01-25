(function () {
    "use strict";
    angular.module('app').factory('DataService', ['$http', '$q', function ($http, $q) {
        var SERVER_URL = "http://127.0.0.1:5000/api";
        return {
            getAllIdioms: getAllIdioms,
            getIdiomsByTag: getIdiomsByTag,
            getIdiomByText: getIdiomByText
        };

        function getAllIdioms() {
            return $q.when($http.get(SERVER_URL + '/all/').then(function (r) {
                return r.data;
            }).catch(function () {
                console.log('DataService: Error in getAllIdioms()');
                return $q.reject('e');
            })
                );
        }

        function getIdiomsByTag(tagName) {
            return $q.when($http.get(SERVER_URL + '/tag/' + tagName).then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }

        function getIdiomByText(text) {
            return $q.when($http.get(SERVER_URL + '/sentence/' + text).then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }
    }]);
        
}());