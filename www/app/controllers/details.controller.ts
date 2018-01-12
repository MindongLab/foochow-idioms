"use strict";

var DictUtils = require('../js/utils');

DetailsController.$inject  = ['$q', 
                        '$scope',
                        '$rootScope', 
                        '$location', 
                        '$stateParams', 
                        '$sce', 
                        'DataService', 
                        'KageService', 
                        'SERVER_AUDIO_URL'];

function DetailsController($q, $scope, $rootScope, 
                     $location, $routeParams, $sce, dataService, kageService, SERVER_AUDIO_URL) {

    $scope.highlight = [];
    $scope.highlightAnno = [];

    console.log('detailsCtrl $scope init');
    console.log($routeParams);
    switchToIdiom($routeParams.idiomtext);

    $scope.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", {'tag': tagName});
        $rootScope.$emit("toggleSidebar", {'state': true});
    };

    $scope.getAbsoluteAudioUrl = function (filename) {
        if (filename === undefined) {
            return '';            
        }
        else {
            return SERVER_AUDIO_URL + filename.replace('.wma', '.mp3');
        }
    };

    // load idiom by text
    function switchToIdiom (text) {
        if (text) {
            dataService.getIdiomByText(text).then(function (r) {
                $scope.result = r;
                var glyphs = DictUtils.getChars(r['field_text']);
                var i;
                var list=[];
                for (i=0; i<glyphs.length; ++i) {
                    list[i]={};
                    list[i]['text']=glyphs[i];
                }
                $scope.field_text = list;
                for (i=0; i<glyphs.length; ++i) {
                    if ((glyphs[i][0]=='{' && glyphs[i][glyphs[i].length-1]=="}")
                        || DictUtils.extendedGlyphs.indexOf(glyphs[i]) != -1) {
                            $scope.field_text[i]['renderByCanvas'] = true;
                    }
                }

            }).catch(function () {
                console.log('detailsCtrl: view change failed.');
            });
        }
    };

    function getGlyphImage(str) {


    }

    $scope.highOn = function (annoId) {
        var indices = $scope.result['field_annotations'][annoId]['indices'];
        var i;
        for (i=0; i<indices.length; ++i) {
            $scope.highlight[indices[i]]=true;
        }
        $scope.highlightAnno[annoId]=true;
    };

    $scope.highOff = function (annoId) {
        var indices = $scope.result['field_annotations'][annoId]['indices'];
        var i;
        for (i=0; i<indices.length; ++i) {
            $scope.highlight[indices[i]]=false;
        }
        $scope.highlightAnno[annoId]=false;
    };


    $scope.showCallout = function () {
        var $ = require('jquery');
        $('.ms-Panel').addClass('is-open');
    }

    $scope.$on('$destroy', function () {

    });

    $scope.$on("$viewContentLoaded", function() {
        $(".ms-Panel").Panel();
    })

};

module.exports = DetailsController;