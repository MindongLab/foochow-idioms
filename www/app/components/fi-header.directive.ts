import { Directive, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
@Directive({
    selector: 'fi-header'
})
export class FiHeaderDirective extends UpgradeComponent {
    constructor(elementRef: ElementRef, injector: Injector) {
        super('fiHeader', elementRef, injector);
    } 
}