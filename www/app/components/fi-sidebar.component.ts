import { defaultDictUtil } from '../utils/DictUtil';
import { IdiomDataService } from '../idioms/idiom-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEventsService } from '../navigation/navigation-events.service';

const $ = require('jquery');
const DictUtil = defaultDictUtil;


export class FiSidebarComponent implements OnInit, OnDestroy {
 
    
    loading: boolean = false;
    list = [];
    loaded: boolean = false;
    // Only applicable in mobile view
    isOpen = false;
    tagName = "";


    constructor (/*$rootScope $location,*/ naviEvents: NavigationEventsService, private dataService: IdiomDataService) {
        this.loadAll();

    }

    ngOnInit(): void {
        $(".ms-SearchBox").SearchBox();
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    hideSidebar = function() {
        $("#sideBar").addClass("sideBarHide");
    };
    

    onListItemClicked (text) {
        $rootScope._query = text;
        //$rootScope.$emit("switchToIdiom", {'text': text});
        $location.path('/idiom/'+text);
        $rootScope.$emit("toggleSidebar", {'state':false});
    };

    onRemoveTagClicked () {
        this.switchToTag("");
    }

    switchToTag(tag) {
        if (tag && tag!='') {
            this.loading = true;
            this.dataService.getIdiomsByTag2(tag).subscribe(function (r) {
                this.list = r;
                this.tagName = tag;
                this.loading = false;
            });
        } else {
            this.tagName="";
            this.loadAll();
        }

    }

    private loadAll() {
        this.loading=true;
        this.dataService.getAllIdioms2().subscribe(function (r) {
            this.list = r;
            this.loaded = true;
            this.loading= false;
        });
    }


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
        if (state != undefined) {
            if (state === false)
                ctrl.isOpen = false;
            else if (state === true)
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

};

FiSidebarController.$inject = ['$scope', '$rootScope', '$location', 'IdiomDataService'];

var FiSidebar = {
    template: require('./fi-sidebar.component.html'),
    controller: FiSidebarController
}

module.exports = FiSidebar;