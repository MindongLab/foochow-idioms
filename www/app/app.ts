"use strict";
angular.module('app', ['ui.router'])
    .constant("SERVER_API_URL",/** inject:SERVER_API_URL **/"http://fiapi.radiumz.org/api"/** endinject **/)
    .constant("SERVER_AUDIO_URL",/** inject:SERVER_AUDIO_URL **/"/assets/audio/"/** endinject **/)
    .constant("CI_BUILD_NUMBER",/** inject:CI_BUILD_NUMBER **/"dev"/** endinject **/)
    .constant("CI_COMMIT_HASH",/** inject:CI_COMMIT_HASH **/"dev"/** endinject **/)
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state({
                name: 'home',
                url: '/',
                template: '<landing-page></landing-page>'
            })
            .state({
                name: 'showidiom',
                url: '/idiom/{idiomtext}',
                component: 'viewIdiomPage',
                caseInsensitiveMatch: true
            })
            .state({
                name: 'showhelp',
                url: '/help',
                component: 'helpPage'
            })
            .state({
                name: 'showcategories',
                url: '/tags',
                component: 'categoryPage'
            })
            .state({
                name: 'showapps',
                url: '/apps',
                template: '<apps-page></apps-page>'
            });

        $urlRouterProvider.otherwise('/');
    }]);

require('./components');

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";
import { FiAppComponent } from "./fi-app/fi-app.component";
import { downgradeComponent, downgradeInjectable } from "@angular/upgrade/static";
import { IdiomDataService } from "./idioms/idiom-data.service";
import { TaxonomyTagComponent } from "./idioms/taxonomy-tag.component";
import { KageService } from "./canvas-char/kage.service";
import { PlayerButtonComponent } from "./idioms/player-button.component";
import { IdiomMainDisplayComponent } from "./idioms/idiom-main-display.component";
import { SearchBoxComponent } from "./fi-app/search-box.component";
import { AppsPageComponent } from "./components/apps-page.component";
import { LandingPageComponent } from "./components/landing-page.component";
platformBrowserDynamic().bootstrapModule(AppModule);

angular.module('app')
    .directive('fiApp', downgradeComponent({ component: FiAppComponent }))
    .directive('taxonomyTag', downgradeComponent({ component: TaxonomyTagComponent }))
    .directive('playerButton', downgradeComponent({ component: PlayerButtonComponent }))
    .directive('idiomMainDisplay', downgradeComponent({ component: IdiomMainDisplayComponent }))
    .directive('searchBox', downgradeComponent({ component: SearchBoxComponent }))
    .directive('landingPage', downgradeComponent({ component: LandingPageComponent }))
    .directive('appsPage', downgradeComponent({ component: AppsPageComponent }))
    .factory('IdiomDataService', downgradeInjectable(IdiomDataService))
    .factory('KageService', downgradeInjectable(KageService))