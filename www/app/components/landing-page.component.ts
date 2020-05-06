import { Component } from "@angular/core"; 
import { KageService } from "../canvas-char/kage.service";
import { NavigationEventsService } from "../navigation/navigation-events.service";

@Component({
    template: require('./landing-page.component.html'),
    selector: 'landing-page'    
})
export class LandingPageComponent {
    
    private kageService: KageService;
    
    constructor (/*$rootScope, $location,*/ kageService: KageService, 
        private naviEvents: NavigationEventsService) {
        this.kageService = kageService;
    }

    public onFeatureClicked(id) {
        switch (id)
        {
            case 1:  // List All
                // show sideBar
                console.log("toggleSidebar", {'state':true});
                this.naviEvents.toggleSidebar(true);
                // remove tag filter
                console.log("switchToTag", {'tag':""});
                break;
            case 2:
                console.log('/tags');
                this.naviEvents.toggleSidebar(false);
                break;
            case 3:
                console.log('/help');
                this.naviEvents.toggleSidebar(false);
                break;
        }
    }

}


