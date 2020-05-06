import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'taxonomy-tag',
    template: require('./taxonomy-tag.component.html')
})
export class TaxonomyTagComponent implements OnInit {
    @Input() text: string;
    @Output() onClicked = new EventEmitter();
    
    constructor() {
    }
    
    ngOnInit() {

    }

    clicked() {
        console.log('clicked');
        this.onClicked.emit();
    }
}