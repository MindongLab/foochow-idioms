(function () {
    "use strict";
    angular.module('app').controller('mainCtrl', ['$scope', '$rootScope', 'DataService', "SERVER_AUDIO_URL", function ($scope, $rootScope, dataService, SERVER_AUDIO_URL) {
        $scope.result = '';
        $scope.detailMode = false;
        $scope.buttonClicked = function () {
            $scope.result = 'Working';
            dataService.getAllIdioms().then(function (r) {
                $scope.result = r;
            }).catch(function () {
                console.log('mainCtrl: getAllIdioms failed.');
            });

        };

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

        //Listen on switchToIdiom event
        var unbind = $rootScope.$on('switchToIdiom', function (e, args) {
            if (args.text) {
                dataService.getIdiomByText(args.text).then(function (r) {
                    $scope.result = r;
                    $scope.detailMode = true;
                }).catch(function () {
                    console.log('mainCtrl: view change failed.');
                });
            }
        });

        $scope.$on('$destroy', unbind);

        //Listen on switchToHome event
        unbind = $rootScope.$on('switchToHome', function (e, args) {
            $scope.detailMode = false;
            $rootScope.$emit('toggleSidebar', {'state':false});
        });

        $scope.$on('$destroy', unbind);

    }]);
}());
