"use strict";
// workaround for global variables
declare var Howl: any;
declare var Tether: any;

var DictUtils = require('../js/utils');

DetailsCtrl.$inject  = ['$q', 
                        '$scope',
                        '$rootScope', 
                        '$location', 
                        '$routeParams', 
                        '$sce', 
                        'DataService', 
                        'KageService', 
                        'SERVER_AUDIO_URL'];

function DetailsCtrl($q, $scope, $rootScope, 
                     $location, $routeParams, $sce, dataService, kageService, SERVER_AUDIO_URL) {

    $scope.highlight = [];
    $scope.highlightAnno = [];

    $scope.isAudioPlaying = false;

    console.log('detailsCtrl $scope init');
    console.log($routeParams);
    switchToIdiom($routeParams.idiomtext);

    $scope.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", {'tag': tagName});
        $rootScope.$emit("toggleSidebar", {'state': true});
    };

    $scope.playButtonClicked = function (filename) {
        if (!$scope.isAudioPlaying) {
            $scope.isAudioPlaying = true;
            var uri = SERVER_AUDIO_URL + filename.replace('.wma', '.mp3');
            var sound = new Howl({
              src: [uri],
              onend: function() {
                console.log('Audio playback finished!');
                $scope.isAudioPlaying = false;
                $scope.$apply();
              }.bind(this),
              onplayerror: function() {
                console.log('Audio playback failed!');
                $scope.isAudioPlaying = false;
                $scope.$apply();
              }.bind(this),
              onloaderror: function() {
                console.log('Audio failed to load!');
                $scope.isAudioPlaying = false;
                $scope.$apply();
              }.bind(this),
            });
            sound.play();
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
                        kageService.getGlyphImage(glyphs[i],200,i).then(function (r) {
                            console.log(r.id);
                            $scope.field_text[r.id]['imgsrc'] = r.data;
                        })
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

    function showShareCallout() {
        $('.shareCallout').addClass('calloutShow').removeClass("calloutHide");
        var shareTether = new Tether({
            element: '.shareCallout',
            target: '.shareButton',
            attachment: 'top center',
            targetAttachment: 'bottom left',
            constraints: [{
                to: 'window',
                pin: true
            }]
        });

    }

    function hideShareCallout() {
        $('.shareCallout').addClass("calloutHide").removeClass('calloutShow');
    }

    $scope.showShare = showShareCallout;

    $scope.$on('$destroy', function () {
        hideShareCallout();

    });

    $scope.initShare = function (){
        $(".ms-Panel").Panel();
    }
};

module.exports = DetailsCtrl;