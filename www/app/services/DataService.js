(function () {
    "use strict";
    angular.module('app').factory('DataService', ['$http', '$q',"SERVER_API_URL",function ($http, $q, SERVER_API_URL) {
        return {
            getAllIdioms: getAllIdioms,
            getIdiomsByTag: getIdiomsByTag,
            getIdiomByText: getIdiomByText,
            getGlype: getGlyph
        };

        function getAllIdioms() {
            return $q.when($http.get(SERVER_API_URL + '/all/').then(function (r) {
                return r.data;
            }).catch(function () {
                console.log('DataService: Error in getAllIdioms()');
                return $q.reject('e');
            })
                );
        }

        function getIdiomsByTag(tagName) {
            return $q.when($http.get(SERVER_API_URL + '/tag/' + tagName).then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }
        
        function getGlyph(ids) {
            return $q.when($http.get(SERVER_API_URL + '/glyph/' + ids).then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }

        function getIdiomByText(text) {
            return $q.when($http.get(SERVER_API_URL + '/sentence/' + text).then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }
    }]);
        
}());