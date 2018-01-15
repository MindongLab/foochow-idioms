
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { FiAppComponent } from './fi-app/fi-app.component';
import { FiHeaderDirective } from './components/fi-header.directive';
import { FiMainviewDirective } from './components/fi-mainview.directive';
import { IdiomDataService } from './idioms/idiom-data.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TaxonomyTagComponent } from './idioms/taxonomy-tag.component';
import { KageService } from './canvas-char/kage.service';
import { PlayerButtonComponent } from './idioms/player-button.component';
import { CanvasCharacterDirective } from './components/canvas-character.directive';
import { IdiomMainDisplayComponent } from './idioms/idiom-main-display.component';
import { SearchBoxComponent } from './fi-app/search-box.component';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        FiAppComponent,
        TaxonomyTagComponent,
        PlayerButtonComponent,
        IdiomMainDisplayComponent,
        SearchBoxComponent,
        FiHeaderDirective,
        FiMainviewDirective,
        CanvasCharacterDirective
    ],
    entryComponents: [
        FiAppComponent,
        TaxonomyTagComponent,
        PlayerButtonComponent,
        IdiomMainDisplayComponent,
        SearchBoxComponent
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
