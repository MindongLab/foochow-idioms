import { Directive, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'fi-mainview'
})
export class FiMainviewDirective extends UpgradeComponent {
    constructor(elementRef: ElementRef, injector: Injector) {
        super('fiMainview', elementRef, injector);
    }
}