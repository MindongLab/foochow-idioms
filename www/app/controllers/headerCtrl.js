(function ($) {
    "use strict";
    angular.module('app').controller('headerCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $scope.isOpen = false;
        
        $scope.homeClicked = function () {
            $location.path('/');
            $rootScope.$emit('toggleSidebar', {'state':false});
        };
        
        $scope.helpClicked = function () {
            $location.path('/help');
            $rootScope.$emit('toggleSidebar', {'state':false});
        };
        
        $scope.ctgrClicked = function () {
            $location.path('/tags');
            $rootScope.$emit('toggleSidebar', {'state':false});
        };
        
        $scope.downloadClicked = function () {
            $location.path('/apps');
            $rootScope.$emit('toggleSidebar', {'state':false});
        };
        
        $scope.init = function () {
            $(".headerCommands.ms-CommandBar").CommandBar();
        };     
        
        $scope.hamburgerClicked = function () {
            $rootScope.$emit('toggleSidebar');
        }; 
        
        
        function changeState(state) {
            if (state!=undefined) {
                if (state == false)
                    $scope.isOpen = false;
                else if (state == true)
                    $scope.isOpen = true;
            } else {
                $scope.isOpen = !$scope.isOpen;
            } console.log($scope.isOpen);
        }
        
        var unbind = $rootScope.$on("toggleSidebar", function (e, args) {
            if (args) {
                changeState(args.state);
            } else {
                changeState();
            }
            
        });
        $scope.$on('$destroy', unbind);
        
      //  $scope.init();
    }]);
}(jQuery));