import { DictUtil } from "../utils/DictUtil";
import { HighlightRegion } from "../lib";

'use strict';

var $ = require('jquery');
function ViewIdiomPageController($q,
    $scope,
    $rootScope,
    $location,
    $routeParams,
    $sce,
    dataService,
    kageService,
    SERVER_AUDIO_URL) {
    var ctrl = this;
    ctrl.$onInit = function () {
        $(".ms-Panel").Panel();
    };

    $scope.highlight = [];
    $scope.highlightAnno = [];
    ctrl.highlightedRegions = [];

    console.log('detailsCtrl $scope init');
    console.log($routeParams);
    switchToIdiom($routeParams.idiomtext);

    ctrl.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", { 'tag': tagName });
        $rootScope.$emit("toggleSidebar", { 'state': true });
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
    function switchToIdiom(text) {
        if (text) {
            dataService.getIdiomByText(text).subscribe(function (r) {
                $scope.result = r;
                var glyphs = (new DictUtil).getChars(r['field_text']);
                var i;
                var list = [];
                for (i = 0; i < glyphs.length; ++i) {
                    list[i] = {};
                    list[i]['text'] = glyphs[i];
                }
                $scope.field_text = list;
                ctrl.glyphs = glyphs;
                for (i = 0; i < glyphs.length; ++i) {
                    if ((glyphs[i][0] == '{' && glyphs[i][glyphs[i].length - 1] == "}")
                        || (new DictUtil).extendedGlyphs.indexOf(glyphs[i]) != -1) {
                        $scope.field_text[i]['renderByCanvas'] = true;
                    }
                }

            });
            //catch(function () {
            //    console.log('detailsCtrl: view change failed.');
            //});
        }
    };
    
    $scope.highOn = function (annoId) {
        var indices = $scope.result['field_annotations'][annoId]['indices'];
        for (let i = 0; i < indices.length; ++i) {
            $scope.highlight[indices[i]] = true;
            ctrl.highlightedRegions.push(new HighlightRegion(indices[i], indices[i]));
        }
        $scope.highlightAnno[annoId] = true;
    };

    $scope.highOff = function (annoId) {
        var indices = $scope.result['field_annotations'][annoId]['indices'];
        var i;
        for (i = 0; i < indices.length; ++i) {
            $scope.highlight[indices[i]] = false;
        }
        ctrl.highlightedRegions = [];
        $scope.highlightAnno[annoId] = false;
    };


    $scope.showCallout = function () {
        var $ = require('jquery');
        $('.ms-Panel').addClass('is-open');
    }

    $scope.$on('$destroy', function () {

    });

};

ViewIdiomPageController.$inject = ['$q',
    '$scope',
    '$rootScope',
    '$location',
    '$stateParams',
    '$sce',
    'IdiomDataService',
    'KageService',
    'SERVER_AUDIO_URL'];

var ViewIdiomPage = {
    template: require('./view-idiom-page.component.html'),
    controller: ViewIdiomPageController
}

module.exports = ViewIdiomPage;