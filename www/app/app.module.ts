
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { FiAppComponent } from './fi-app/fi-app.component';
import { FiHeaderDirective } from './components/fi-header.directive';
import { FiMainviewDirective } from './components/fi-mainview.directive';
import { IdiomDataService } from './idioms/idiom-data.service';
import { HttpModule } from '@angular/http';
import { TaxonomyTagComponent } from './idioms/taxonomy-tag.component';
import { KageService } from './canvas-char/kage.service';
import { PlayerButtonComponent } from './idioms/player-button.component';
import { CanvasCharacterDirective } from './components/canvas-character.directive';
import { IdiomMainDisplayComponent } from './idioms/idiom-main-display.component';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        HttpModule
    ],
    declarations: [
        FiAppComponent,
        TaxonomyTagComponent,
        PlayerButtonComponent,
        IdiomMainDisplayComponent,
        FiHeaderDirective,
        FiMainviewDirective,
        CanvasCharacterDirective
    ],
    entryComponents: [
        FiAppComponent,
        TaxonomyTagComponent,
        PlayerButtonComponent,
        IdiomMainDisplayComponent
    ],
    providers: [
        IdiomDataService,
        KageService
    ]
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) { }
    ngDoBootstrap() {
        this.upgrade.bootstrap(document.body, ['app']);
    }
}
