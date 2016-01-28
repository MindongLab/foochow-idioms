(function ($) {
    "use strict";
    angular.module('app').controller('sidebarCtrl', ['$scope', '$rootScope', 'DataService', function ($scope, $rootScope, dataService) {
        var hideSidebar = function() {
            $("#sideBar").addClass("sideBarHide");
        };
        
        $scope.list = [];
        $scope.loaded = false;
        //Only applicable in mobile view
        $scope.isOpen = false;
        
        
        $scope.init = function () {
            $(".ms-SearchBox").SearchBox();
        }
        
        $scope.listItemClicked = function (text) {
            $rootScope._query = text;
            $rootScope.$emit("switchToIdiom", {'text': text});
            $rootScope.$emit("toggleSidebar", {'state':false})
        };

        dataService.getAllIdioms().then(function (r) {
            $scope.list = r;
            $scope.loaded = true;
        });

        var unbind = $rootScope.$on("switchToTag", function (e, args) {
            if (args && args.tag) {
                dataService.getIdiomsByTag(args.tag).then(function (r) {
                    $scope.list = r;
                });
            }
        });

        $scope.$on('$destroy', unbind);
        
        function toggleSidebar(state) {
            if (state!=undefined) {
                if (state == false)
                    $scope.isOpen = false;
                else if (state == true)
                    $scope.isOpen = true;
            } else {
                $scope.isOpen = !$scope.isOpen;
            }console.log($scope.isOpen);
            //Animate
            if ($scope.isOpen)
            {
                $("#sideBar").removeClass("sideBarHide").removeClass("slideLeftOut40").addClass("slideRightIn40");
            } else
            {   
                $("#sideBar").removeClass("slideRightIn40").addClass("slideLeftOut40");
                setTimeout(hideSidebar,170);
            }
        }
        
        $scope.toggleSidebar = toggleSidebar;
        
        
        unbind = $rootScope.$on("toggleSidebar", function (e, args) {
            if (args) {
                toggleSidebar(args.state);
            } else {
                toggleSidebar();
            }
            
        });
        $scope.$on('$destroy', unbind);
    }]);
}(jQuery));