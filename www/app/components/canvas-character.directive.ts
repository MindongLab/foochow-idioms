import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
@Directive({
    selector: 'canvas-character'
})
export class CanvasCharacterDirective extends UpgradeComponent {
    @Input() ids: string;
    @Input() size: number;
    @Input() char: string;
    constructor(elementRef: ElementRef, injector: Injector) {
        super('canvasCharacter', elementRef, injector);
    }
}