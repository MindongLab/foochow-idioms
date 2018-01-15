'use strict';
import * as DataModel from "../models";
import {CharArray} from "../js/char-array";

DataService.$inject = ['$http', '$q', "SERVER_API_URL"];

function DataService($http, $q, SERVER_API_URL) {
    return {
        getAllIdioms: getAllIdioms,
        getAllIdioms2: getAllIdioms2,
        getIdiomsByTag: getIdiomsByTag,
        getIdiomByText: getIdiomByText,
        getIdiomByText2: getIdiomByText2,
        getGlyph: getGlyph,
        getAllTags: getAllTags
    };

    function getAllIdioms() {
        return $q.when($http.get(SERVER_API_URL + '/all/').then(function (r) {
            return r.data;
        }).catch(function () {
            console.log('DataService: Error in getAllIdioms()');
            return $q.reject('e');
        }));
    }

    function getAllIdioms2() : Promise<Array<CharArray>>{
        return $q.when($http.get(SERVER_API_URL + '/all/').then(function (r) {

            var tmp = new Array<CharArray>();
            console.log(r.data);
            for (var i = 0; i < r.data.length; ++i) {
                tmp.push(new CharArray(r.data[i]));
            }
            return tmp;

        }).catch(function () {
            console.log('DataService: Error in getAllIdioms()');
            return $q.reject('e');
        })
        );
    }

    function getAllTags() {
        return $q.when($http.get(SERVER_API_URL + '/tags/').then(function (r) {
            return r.data;
        }).catch(function () {
            console.log('DataService: Error in getAllTags()');
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

    function jsonToIdiomEntry(obj: any) {
        var entry = new DataModel.IdiomEntry();
        entry.setTextUsingString(obj.field_text);
        entry.id = obj._id;
        entry.notes = obj.field_notes || "";
        entry.metaphor = obj.field_metaphor || "";
        for (let anno of obj.field_annotations) {
            var newA = new DataModel.IdiomAnnotation();
            newA.parseObject(anno);
            entry.addAnnotation(newA);
        };
        for (let tag of obj.field_tags) {
            var newT  = new DataModel.IdiomTag(tag);
            entry.addTag(newT);
        }
        entry.audioFile = obj.field_audio;

        return entry;
    }
    async function getIdiomByText2(text) : Promise<DataModel.IdiomEntry> {
        // returns a IdiomEntry
        return $q.when($http.get(SERVER_API_URL + '/sentence/' + text).then(function (r) {
            console.log(r);
            return jsonToIdiomEntry(r.data);
        }).catch(function () {
            return $q.reject('e');
        }));
    }
};

module.exports = DataService;


