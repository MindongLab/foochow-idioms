(function () {
    "use strict";
    angular.module('app').controller('detailsCtrl', ['$scope', '$rootScope', '$location', '$routeParams','DataService', "SERVER_AUDIO_URL", function ($scope, $rootScope, $location, $routeParams, dataService, SERVER_AUDIO_URL) {
        
        $scope.result = '';
        $scope.highlight = [];
        $scope.highlightAnno = [];
        console.log('detailsCtrl $scope init');
        console.log($routeParams);
        switchToIdiom($routeParams.idiomtext);

        $scope.tagClicked = function (tagName) {
            $rootScope.$emit("switchToTag", {'tag': tagName});
            $rootScope.$emit("toggleSidebar", {'state': true});
        };

        $scope.playButtonClicked = function (filename) {
            var uri = SERVER_AUDIO_URL + filename.replace('.wma', '.mp3'),
                sound = new Howl({
                    urls: [uri]
                }).play();
        };

        //loadIdiom
        function switchToIdiom (text) {
            if (text) {
                dataService.getIdiomByText(text).then(function (r) {
                    $scope.result = r;
                    $scope.field_text = DictUtils.getChars(r['field_text']);
                }).catch(function () {
                    console.log('detailsCtrl: view change failed.');
                });
            }
        };
        
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

    }]);
}());
