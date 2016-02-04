(function ($) {
    "use strict";
    angular.module('app').controller('sidebarCtrl', ['$scope', '$rootScope', '$location', 'DataService', function ($scope, $rootScope, $location, dataService) {
        var hideSidebar = function() {
            $("#sideBar").addClass("sideBarHide");
        };
        $scope.loading=false;
        $scope.list = [];
        $scope.loaded = false;
        //Only applicable in mobile view
        $scope.isOpen = false;
        $scope.tagName = "";
        
        $scope.init = function () {
            $(".ms-SearchBox").SearchBox();
        }
        
        $scope.listItemClicked = function (text) {
            $rootScope._query = text;
            //$rootScope.$emit("switchToIdiom", {'text': text});
            $location.path('/idiom/'+text);
            $rootScope.$emit("toggleSidebar", {'state':false});
        };
        
        $scope.removeTagClicked = function () {
            switchToTag("");
        }
        
        function switchToTag(tag) {
            if (tag && tag!='') {
                $scope.loading = true;
                dataService.getIdiomsByTag(tag).then(function (r) {
                    $scope.list = r;
                    $scope.tagName =  tag;
                    $scope.loading= false;
                });
            } else {
                $scope.tagName="";
                loadAll();
            }
            
        }
        
        function loadAll() {
            $scope.loading=true;
            dataService.getAllIdioms().then(function (r) {
                $scope.list = r;
                $scope.loaded = true;
                $scope.loading= false;
            });
        }
        
        loadAll();
        
        var unbind = $rootScope.$on("switchToTag", function (e, args) {
            if (args && args.tag) {
                switchToTag(args.tag);
            } else {
                switchToTag("");
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