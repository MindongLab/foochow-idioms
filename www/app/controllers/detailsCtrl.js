(function () {
    "use strict";
    angular.module('app').controller('detailsCtrl', ['$scope', '$rootScope', '$location', '$routeParams','DataService', "SERVER_AUDIO_URL", function ($scope, $rootScope, $location, $routeParams, dataService, SERVER_AUDIO_URL) {
        
        $scope.result = '';
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

        //Listen on switchToHome event
        var unbind = $rootScope.$on('switchToHome', function (e, args) {
            $scope.detailMode = false;
            $location.path('/');
            $rootScope.$emit('toggleSidebar', {'state':false});
        });

        $scope.$on('$destroy', unbind);
        //Listen on switchToAbout event
        unbind = $rootScope.$on('switchToAbout', function (e, args) {
            $location.path('/about');
            $rootScope.$emit('toggleSidebar', {'state':false});
        });

        $scope.$on('$destroy', unbind);
        //Listen on switchToHelp event
        unbind = $rootScope.$on('switchToHelp', function (e, args) {
            $location.path('/help');
            $rootScope.$emit('toggleSidebar', {'state':false});
        });

        $scope.$on('$destroy', unbind);
        
    }]);
}());
