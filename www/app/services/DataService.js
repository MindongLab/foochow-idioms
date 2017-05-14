(function () {
    "use strict";
    angular.module('app').factory('DataService', ['$http', '$q',"SERVER_API_URL",function ($http, $q, SERVER_API_URL) {
        return {
            getAllIdioms: getAllIdioms,
            getIdiomsByTag: getIdiomsByTag,
            getIdiomById: getIdiomById,
            getGlyph: getGlyph,
            getAllTags: getAllTags
        };

        function getAllIdioms() {
            return $q.when($http.get(SERVER_API_URL + '/all.json').then(function (r) {
                let transformed = (r.data.map((d)=>({"title":d.field_text,"id":d._id})));
                return transformed;
            }).catch(function () {
                console.log('DataService: Error in getAllIdioms()');
                return $q.reject('e');
            })
                );
        }
        
       function getAllTags() {
            return $q.when($http.get(SERVER_API_URL + '/all_tags.json').then(function (r) {
                return r.data;
            }).catch(function () {
                console.log('DataService: Error in getAllTags()');
                return $q.reject('e');
            })
            );
        }

        function getIdiomsByTag(tagName) {
            return $q.when($http.get(SERVER_API_URL + '/tag_' + encodeURI(encodeURI(tagName))+'.json').then(function (r) {
                return (r.data.map((d)=>({"title":d.field_text,"id":d._id})));
            }).catch(function () {
                return $q.reject('e');
            }));
        }
        
        function getGlyph(ids) {
            return $q.when($http.get(SERVER_API_URL + '/glyph_' + encodeURI(encodeURI(ids))+'.json').then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }

        function getIdiomById(id) {
            return $q.when($http.get(SERVER_API_URL + '/s_' + id+'.json').then(function (r) {
                return r.data;
            }).catch(function () {
                return $q.reject('e');
            }));
        }
    }]);
        
}());