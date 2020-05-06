import { Component, Input, Output } from "@angular/core";
import { NumberSymbol } from "@angular/common/src/i18n/locale_data_api";
import { HighlightRegion } from "../lib";
import { DictUtil } from "../utils/DictUtil";
import { EventEmitter } from "@angular/core";
import { OnInit } from "@angular/core";

@Component({
    selector: 'search-box',
    template: require('./search-box.component.html'),
})
export class SearchBoxComponent implements OnInit {
    private _searchText:string;
    
    @Input() get searchText() : string {
        return this._searchText;
    }
    @Output() searchTextChange = new EventEmitter<string>();
    set searchText(val) {
        this._searchText = val;
        this.searchTextChange.emit(val);
    }
    @Input() filter: string = "";
    @Output() filterRemoved = new EventEmitter();

    private DictUtil = new DictUtil();
    constructor() {

    }

    ngOnInit() {
        $(".ms-SearchBox").SearchBox();
    }
    removeTagClicked() {
        //this.filter = "";
        this.filterRemoved.emit();
    }

}

