'use strict';
import { defaultDictUtil } from '../utils/DictUtil';
import { IdiomDataService } from '../idioms/idiom-data.service';

var $ = require('jquery');
function FiSidebarController($scope, $rootScope, $location, dataService: IdiomDataService) {

    var ctrl = this;
    var hideSidebar = function() {
        $("#sideBar").addClass("sideBarHide");
    };
    ctrl.loading = false;
    ctrl.list = [];
    ctrl.loaded = false;
    // Only applicable in mobile view
    ctrl.isOpen = false;
    ctrl.tagName = "";
    ctrl.DictUtil = defaultDictUtil;

    ctrl.$onInit = function () {
        $(".ms-SearchBox").SearchBox();
    }

    ctrl.listItemClicked = function (text) {
        $rootScope._query = text;
        //$rootScope.$emit("switchToIdiom", {'text': text});
        $location.path('/idiom/'+text);
        $rootScope.$emit("toggleSidebar", {'state':false});
    };

    ctrl.removeTagClicked = function () {
        switchToTag("");
    }

    function switchToTag(tag) {
        if (tag && tag!='') {
            ctrl.loading = true;
            dataService.getIdiomsByTag2(tag).subscribe(function (r) {
                ctrl.list = r;
                ctrl.tagName = tag;
                ctrl.loading = false;
            });
        } else {
            ctrl.tagName="";
            loadAll();
        }

    }

    function loadAll() {
        ctrl.loading=true;
        dataService.getAllIdioms2().subscribe(function (r) {
            ctrl.list = r;
            ctrl.loaded = true;
            ctrl.loading= false;
        });
    }

    loadAll();

    var unbindSTT = $rootScope.$on("switchToTag", function (e, args) {
        if (args && args.tag) {
            switchToTag(args.tag);
        } else {
            switchToTag("");
        }
    });

    var unbindTS = $rootScope.$on("toggleSidebar", function (e, args) {
        if (args) {
            toggleSidebar(args.state);
        } else {
            toggleSidebar(undefined);
        }

    });

    ctrl.$onDestroy = function () {
        unbindSTT();
        unbindTS();
    };

    function toggleSidebar(state) {
        if (state!=undefined) {
            if (state == false)
                ctrl.isOpen = false;
            else if (state == true)
                ctrl.isOpen = true;
        } else {
            ctrl.isOpen = !ctrl.isOpen;
        } 
        console.log(ctrl.isOpen);
        // Animate
        if (ctrl.isOpen)
        {
            $("#sideBar").removeClass("sideBarHide").removeClass("slideLeftOut40").addClass("slideRightIn40");
        } else
        {
            $("#sideBar").removeClass("slideRightIn40").addClass("slideLeftOut40");
            setTimeout(hideSidebar, 170);
        }
    }

    ctrl.toggleSidebar = toggleSidebar;

};

FiSidebarController.$inject = ['$scope', '$rootScope', '$location', 'IdiomDataService'];

var FiSidebar = {
    template: require('./fi-sidebar.component.html'),
    controller: FiSidebarController
}

module.exports = FiSidebar;